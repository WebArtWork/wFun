import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { FunjokeService } from '../../services/funjoke.service';
import { Funjoke } from '../../interfaces/funjoke.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { funjokeFormComponents } from '../../formcomponents/funjoke.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './funjoke.component.html',
	styleUrls: ['./funjoke.component.scss'],
	standalone: false,
})
export class FunjokeComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('funjoke', funjokeFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._funjokeService.setPerPage.bind(this._funjokeService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Funjoke>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Funjoke);

					await firstValueFrom(
						this._funjokeService.create(created as Funjoke)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Funjoke): void => {
			this._form
				.modal<Funjoke>(this.form, [], doc)
				.then((updated: Funjoke) => {
					this._core.copy(updated, doc);

					this._funjokeService.update(doc);
				});
		},
		delete: (doc: Funjoke): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this funjoke?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._funjokeService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Funjoke): void => {
					this._form.modalUnique<Funjoke>('funjoke', 'url', doc);
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

	rows: Funjoke[] = [];

	constructor(
		private _translate: TranslateService,
		private _funjokeService: FunjokeService,
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
				this._funjokeService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Funjoke>(create ? [] : this.rows)
				.then(async (funjokes: Funjoke[]) => {
					if (create) {
						for (const funjoke of funjokes) {
							this._preCreate(funjoke);

							await firstValueFrom(
								this._funjokeService.create(funjoke)
							);
						}
					} else {
						for (const funjoke of this.rows) {
							if (
								!funjokes.find(
									(localFunjoke) => localFunjoke._id === funjoke._id
								)
							) {
								await firstValueFrom(
									this._funjokeService.delete(funjoke)
								);
							}
						}

						for (const funjoke of funjokes) {
							const localFunjoke = this.rows.find(
								(localFunjoke) => localFunjoke._id === funjoke._id
							);

							if (localFunjoke) {
								this._core.copy(funjoke, localFunjoke);

								await firstValueFrom(
									this._funjokeService.update(localFunjoke)
								);
							} else {
								this._preCreate(funjoke);

								await firstValueFrom(
									this._funjokeService.create(funjoke)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(funjoke: Funjoke): void {
		delete funjoke.__created;
	}
}
