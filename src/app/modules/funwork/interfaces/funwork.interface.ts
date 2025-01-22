import { CrudDocument } from 'wacom';

export interface Funwork extends CrudDocument {
	name: string;
	description: string;
}
