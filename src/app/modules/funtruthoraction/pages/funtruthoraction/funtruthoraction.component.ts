import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { FuntruthoractionService } from '../../services/funtruthoraction.service';
import { Funtruthoraction } from '../../interfaces/funtruthoraction.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { funtruthoractionFormComponents } from '../../formcomponents/funtruthoraction.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './funtruthoraction.component.html',
	styleUrls: ['./funtruthoraction.component.scss'],
	standalone: false,
})
export class FuntruthoractionComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('funtruthoraction', funtruthoractionFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._funtruthoractionService.setPerPage.bind(this._funtruthoractionService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Funtruthoraction>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Funtruthoraction);

					await firstValueFrom(
						this._funtruthoractionService.create(created as Funtruthoraction)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Funtruthoraction): void => {
			this._form
				.modal<Funtruthoraction>(this.form, [], doc)
				.then((updated: Funtruthoraction) => {
					this._core.copy(updated, doc);

					this._funtruthoractionService.update(doc);
				});
		},
		delete: (doc: Funtruthoraction): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this funtruthoraction?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._funtruthoractionService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Funtruthoraction): void => {
					this._form.modalUnique<Funtruthoraction>('funtruthoraction', 'url', doc);
				},
			},
		],
		headerButtons: [
			{
				icon: 'playlist_add',
				click: this._bulkManagement(),
				class: 'playlist',
			},
			{
				icon: 'edit_note',
				click: this._bulkManagement(false),
				class: 'edit',
			},
		],
	};

	rows: Funtruthoraction[] = [];

	constructor(
		private _translate: TranslateService,
		private _funtruthoractionService: FuntruthoractionService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {
		this.setRows();
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._funtruthoractionService.get({ page }).subscribe((rows) => {
					this.rows.splice(0, this.rows.length);

					this.rows.push(...rows);
				});
			},
			250
		);
	}

	private _page = 1;

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Funtruthoraction>(create ? [] : this.rows)
				.then(async (funtruthoractions: Funtruthoraction[]) => {
					if (create) {
						for (const funtruthoraction of funtruthoractions) {
							this._preCreate(funtruthoraction);

							await firstValueFrom(
								this._funtruthoractionService.create(funtruthoraction)
							);
						}
					} else {
						for (const funtruthoraction of this.rows) {
							if (
								!funtruthoractions.find(
									(localFuntruthoraction) => localFuntruthoraction._id === funtruthoraction._id
								)
							) {
								await firstValueFrom(
									this._funtruthoractionService.delete(funtruthoraction)
								);
							}
						}

						for (const funtruthoraction of funtruthoractions) {
							const localFuntruthoraction = this.rows.find(
								(localFuntruthoraction) => localFuntruthoraction._id === funtruthoraction._id
							);

							if (localFuntruthoraction) {
								this._core.copy(funtruthoraction, localFuntruthoraction);

								await firstValueFrom(
									this._funtruthoractionService.update(localFuntruthoraction)
								);
							} else {
								this._preCreate(funtruthoraction);

								await firstValueFrom(
									this._funtruthoractionService.create(funtruthoraction)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(funtruthoraction: Funtruthoraction): void {
		delete funtruthoraction.__created;
	}
}
