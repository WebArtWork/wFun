import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { FuntagService } from '../../services/funtag.service';
import { Funtag } from '../../interfaces/funtag.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { funtagFormComponents } from '../../formcomponents/funtag.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './funtag.component.html',
	styleUrls: ['./funtag.component.scss'],
	standalone: false,
})
export class FuntagComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('funtag', funtagFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._funtagService.setPerPage.bind(this._funtagService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Funtag>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Funtag);

					await firstValueFrom(
						this._funtagService.create(created as Funtag)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Funtag): void => {
			this._form
				.modal<Funtag>(this.form, [], doc)
				.then((updated: Funtag) => {
					this._core.copy(updated, doc);

					this._funtagService.update(doc);
				});
		},
		delete: (doc: Funtag): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this funtag?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._funtagService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Funtag): void => {
					this._form.modalUnique<Funtag>('funtag', 'url', doc);
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

	rows: Funtag[] = [];

	constructor(
		private _translate: TranslateService,
		private _funtagService: FuntagService,
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
				this._funtagService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Funtag>(create ? [] : this.rows)
				.then(async (funtags: Funtag[]) => {
					if (create) {
						for (const funtag of funtags) {
							this._preCreate(funtag);

							await firstValueFrom(
								this._funtagService.create(funtag)
							);
						}
					} else {
						for (const funtag of this.rows) {
							if (
								!funtags.find(
									(localFuntag) => localFuntag._id === funtag._id
								)
							) {
								await firstValueFrom(
									this._funtagService.delete(funtag)
								);
							}
						}

						for (const funtag of funtags) {
							const localFuntag = this.rows.find(
								(localFuntag) => localFuntag._id === funtag._id
							);

							if (localFuntag) {
								this._core.copy(funtag, localFuntag);

								await firstValueFrom(
									this._funtagService.update(localFuntag)
								);
							} else {
								this._preCreate(funtag);

								await firstValueFrom(
									this._funtagService.create(funtag)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(funtag: Funtag): void {
		delete funtag.__created;
	}
}
