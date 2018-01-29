import { Route, Get } from 'tsoa';
import Bot from '../entities/Bot';

@Route('bots')
export default class BotResource {

	@Get('{id}')
	public async Get(id: number): Promise<Bot> {
		//make db call and return bot object
	}
}
