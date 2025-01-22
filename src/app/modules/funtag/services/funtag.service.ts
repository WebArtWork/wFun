import { Injectable } from '@angular/core';
import { Funtag } from '../interfaces/funtag.interface';
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
export class FuntagService extends CrudService<Funtag> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'funtag',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
