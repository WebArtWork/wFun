import { CrudDocument } from 'wacom';

export interface Funquestion extends CrudDocument {
	name: string;
	description: string;
}
