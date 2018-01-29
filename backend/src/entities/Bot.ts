import User from './User';
import { Table, Model, Column, HasMany, CreatedAt, DataType } from 'sequelize-typescript';

export interface BotInterface {
	id: string;
	owners: User[];
	added: Date;
	short_description?: string;
	description?: string;
}

@Table
export default class Bot extends Model<Bot> implements BotInterface {
	
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