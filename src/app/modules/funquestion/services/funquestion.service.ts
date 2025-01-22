import { Injectable } from '@angular/core';
import { Funquestion } from '../interfaces/funquestion.interface';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService
} from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class FunquestionService extends CrudService<Funquestion> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'funquestion',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
