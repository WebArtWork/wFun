import { Injectable } from '@angular/core';
import { Fungame } from '../interfaces/fungame.interface';
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
export class FungameService extends CrudService<Fungame> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'fungame',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
