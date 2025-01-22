import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { FunquestionService } from '../../services/funquestion.service';
import { Funquestion } from '../../interfaces/funquestion.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { funquestionFormComponents } from '../../formcomponents/funquestion.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './funquestion.component.html',
	styleUrls: ['./funquestion.component.scss'],
	standalone: false,
})
export class FunquestionComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('funquestion', funquestionFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._funquestionService.setPerPage.bind(this._funquestionService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Funquestion>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Funquestion);

					await firstValueFrom(
						this._funquestionService.create(created as Funquestion)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Funquestion): void => {
			this._form
				.modal<Funquestion>(this.form, [], doc)
				.then((updated: Funquestion) => {
					this._core.copy(updated, doc);

					this._funquestionService.update(doc);
				});
		},
		delete: (doc: Funquestion): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this funquestion?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._funquestionService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Funquestion): void => {
					this._form.modalUnique<Funquestion>('funquestion', 'url', doc);
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

	rows: Funquestion[] = [];

	constructor(
		private _translate: TranslateService,
		private _funquestionService: FunquestionService,
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
				this._funquestionService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Funquestion>(create ? [] : this.rows)
				.then(async (funquestions: Funquestion[]) => {
					if (create) {
						for (const funquestion of funquestions) {
							this._preCreate(funquestion);

							await firstValueFrom(
								this._funquestionService.create(funquestion)
							);
						}
					} else {
						for (const funquestion of this.rows) {
							if (
								!funquestions.find(
									(localFunquestion) => localFunquestion._id === funquestion._id
								)
							) {
								await firstValueFrom(
									this._funquestionService.delete(funquestion)
								);
							}
						}

						for (const funquestion of funquestions) {
							const localFunquestion = this.rows.find(
								(localFunquestion) => localFunquestion._id === funquestion._id
							);

							if (localFunquestion) {
								this._core.copy(funquestion, localFunquestion);

								await firstValueFrom(
									this._funquestionService.update(localFunquestion)
								);
							} else {
								this._preCreate(funquestion);

								await firstValueFrom(
									this._funquestionService.create(funquestion)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(funquestion: Funquestion): void {
		delete funquestion.__created;
	}
}
