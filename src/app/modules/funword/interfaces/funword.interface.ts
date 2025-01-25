import { CrudDocument } from 'wacom';

export interface Funword extends CrudDocument {
	name: string;
	description: string;
}
