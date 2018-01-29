export default interface BotRepresentation {
	id: string;
	owners: User[];
	added: Date;
	short_description?: string;
	description?: string;
}