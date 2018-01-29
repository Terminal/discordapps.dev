import User from './User';

export default interface Bot {
	id: number;
	owners: User[];
	added: Date;
	short_description?: string;
	description?: string;
}
