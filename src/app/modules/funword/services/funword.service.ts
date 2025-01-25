import { Injectable } from '@angular/core';
import { Funword } from '../interfaces/funword.interface';
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
export class FunwordService extends CrudService<Funword> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'funword',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
