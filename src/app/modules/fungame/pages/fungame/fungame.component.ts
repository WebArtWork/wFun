import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { FungameService } from '../../services/fungame.service';
import { Fungame } from '../../interfaces/fungame.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { fungameFormComponents } from '../../formcomponents/fungame.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './fungame.component.html',
	styleUrls: ['./fungame.component.scss'],
	standalone: false,
})
export class FungameComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('fungame', fungameFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._fungameService.setPerPage.bind(this._fungameService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Fungame>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Fungame);

					await firstValueFrom(
						this._fungameService.create(created as Fungame)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Fungame): void => {
			this._form
				.modal<Fungame>(this.form, [], doc)
				.then((updated: Fungame) => {
					this._core.copy(updated, doc);

					this._fungameService.update(doc);
				});
		},
		delete: (doc: Fungame): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this fungame?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._fungameService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Fungame): void => {
					this._form.modalUnique<Fungame>('fungame', 'url', doc);
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

	rows: Fungame[] = [];

	constructor(
		private _translate: TranslateService,
		private _fungameService: FungameService,
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
				this._fungameService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Fungame>(create ? [] : this.rows)
				.then(async (fungames: Fungame[]) => {
					if (create) {
						for (const fungame of fungames) {
							this._preCreate(fungame);

							await firstValueFrom(
								this._fungameService.create(fungame)
							);
						}
					} else {
						for (const fungame of this.rows) {
							if (
								!fungames.find(
									(localFungame) => localFungame._id === fungame._id
								)
							) {
								await firstValueFrom(
									this._fungameService.delete(fungame)
								);
							}
						}

						for (const fungame of fungames) {
							const localFungame = this.rows.find(
								(localFungame) => localFungame._id === fungame._id
							);

							if (localFungame) {
								this._core.copy(fungame, localFungame);

								await firstValueFrom(
									this._fungameService.update(localFungame)
								);
							} else {
								this._preCreate(fungame);

								await firstValueFrom(
									this._fungameService.create(fungame)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(fungame: Fungame): void {
		delete fungame.__created;
	}
}
