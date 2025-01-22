import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { FunworkService } from '../../services/funwork.service';
import { Funwork } from '../../interfaces/funwork.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { funworkFormComponents } from '../../formcomponents/funwork.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './funwork.component.html',
	styleUrls: ['./funwork.component.scss'],
	standalone: false,
})
export class FunworkComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('funwork', funworkFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._funworkService.setPerPage.bind(this._funworkService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Funwork>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Funwork);

					await firstValueFrom(
						this._funworkService.create(created as Funwork)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Funwork): void => {
			this._form
				.modal<Funwork>(this.form, [], doc)
				.then((updated: Funwork) => {
					this._core.copy(updated, doc);

					this._funworkService.update(doc);
				});
		},
		delete: (doc: Funwork): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this funwork?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._funworkService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Funwork): void => {
					this._form.modalUnique<Funwork>('funwork', 'url', doc);
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

	rows: Funwork[] = [];

	constructor(
		private _translate: TranslateService,
		private _funworkService: FunworkService,
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
				this._funworkService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Funwork>(create ? [] : this.rows)
				.then(async (funworks: Funwork[]) => {
					if (create) {
						for (const funwork of funworks) {
							this._preCreate(funwork);

							await firstValueFrom(
								this._funworkService.create(funwork)
							);
						}
					} else {
						for (const funwork of this.rows) {
							if (
								!funworks.find(
									(localFunwork) => localFunwork._id === funwork._id
								)
							) {
								await firstValueFrom(
									this._funworkService.delete(funwork)
								);
							}
						}

						for (const funwork of funworks) {
							const localFunwork = this.rows.find(
								(localFunwork) => localFunwork._id === funwork._id
							);

							if (localFunwork) {
								this._core.copy(funwork, localFunwork);

								await firstValueFrom(
									this._funworkService.update(localFunwork)
								);
							} else {
								this._preCreate(funwork);

								await firstValueFrom(
									this._funworkService.create(funwork)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(funwork: Funwork): void {
		delete funwork.__created;
	}
}
