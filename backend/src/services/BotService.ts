import Service from "./Service";
import Bot, { BotDatabaseModel } from "../entities/Bot";

export default class BotService implements Service {
	databaseModel: BotDatabaseModel;
	constructor() {
		this.databaseModel = new BotDatabaseModel();
	}
	get(): Bot {

	}
}