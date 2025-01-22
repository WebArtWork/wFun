import { Injectable } from '@angular/core';
import { Funwork } from '../interfaces/funwork.interface';
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
export class FunworkService extends CrudService<Funwork> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'funwork',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
