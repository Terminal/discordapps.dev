import User from './User';
import { Table, Model, Column, HasMany, CreatedAt, DataType } from 'sequelize-typescript';
import BotRepresentation from './BotRepresentation';

@Table
export default class Bot extends Model<Bot> implements BotRepresentation {
	
	@Column
	id: string;

	@CreatedAt
	added: Date;

	@HasMany(() => User)
	owners: User[];

	@Column(DataType.STRING)
	short_description: string;

	@Column(DataType.TEXT)
	description: string;
}