import DatabaseConfiguration from "./abstracts/DatabaseConfiguration";
import { Sequelize } from 'sequelize-typescript';

export default class Database {
	client: Sequelize
	constructor(config: DatabaseConfiguration) {
		this.client = new Sequelize(config.db);
		this.client.addModels(['../entities/*.ts']);
	}
}