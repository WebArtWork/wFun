import { CrudDocument } from 'wacom';

export interface Funtag extends CrudDocument {
	name: string;
	description: string;
}
