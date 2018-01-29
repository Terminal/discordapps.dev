import { Model } from "sequelize";

export default interface Service {
	find: void;
	findAll: void;
	databaseModel: Model;
}