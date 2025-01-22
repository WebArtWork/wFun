import { Injectable } from '@angular/core';
import { Funjoke } from '../interfaces/funjoke.interface';
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
export class FunjokeService extends CrudService<Funjoke> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'funjoke',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
