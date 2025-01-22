import { CrudDocument } from 'wacom';

export interface Fungame extends CrudDocument {
	name: string;
	description: string;
}
