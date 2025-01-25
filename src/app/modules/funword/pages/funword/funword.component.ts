import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { FunwordService } from '../../services/funword.service';
import { Funword } from '../../interfaces/funword.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { funwordFormComponents } from '../../formcomponents/funword.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './funword.component.html',
	styleUrls: ['./funword.component.scss'],
	standalone: false,
})
export class FunwordComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('funword', funwordFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._funwordService.setPerPage.bind(this._funwordService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Funword>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Funword);

					await firstValueFrom(
						this._funwordService.create(created as Funword)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Funword): void => {
			this._form
				.modal<Funword>(this.form, [], doc)
				.then((updated: Funword) => {
					this._core.copy(updated, doc);

					this._funwordService.update(doc);
				});
		},
		delete: (doc: Funword): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this funword?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._funwordService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Funword): void => {
					this._form.modalUnique<Funword>('funword', 'url', doc);
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

	rows: Funword[] = [];

	constructor(
		private _translate: TranslateService,
		private _funwordService: FunwordService,
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
				this._funwordService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Funword>(create ? [] : this.rows)
				.then(async (funwords: Funword[]) => {
					if (create) {
						for (const funword of funwords) {
							this._preCreate(funword);

							await firstValueFrom(
								this._funwordService.create(funword)
							);
						}
					} else {
						for (const funword of this.rows) {
							if (
								!funwords.find(
									(localFunword) => localFunword._id === funword._id
								)
							) {
								await firstValueFrom(
									this._funwordService.delete(funword)
								);
							}
						}

						for (const funword of funwords) {
							const localFunword = this.rows.find(
								(localFunword) => localFunword._id === funword._id
							);

							if (localFunword) {
								this._core.copy(funword, localFunword);

								await firstValueFrom(
									this._funwordService.update(localFunword)
								);
							} else {
								this._preCreate(funword);

								await firstValueFrom(
									this._funwordService.create(funword)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(funword: Funword): void {
		delete funword.__created;
	}
}
