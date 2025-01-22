import { Injectable } from '@angular/core';
import { Funtruthoraction } from '../interfaces/funtruthoraction.interface';
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
export class FuntruthoractionService extends CrudService<Funtruthoraction> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'funtruthoraction',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
