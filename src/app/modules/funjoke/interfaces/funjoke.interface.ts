import { CrudDocument } from 'wacom';

export interface Funjoke extends CrudDocument {
	name: string;
	description: string;
}
