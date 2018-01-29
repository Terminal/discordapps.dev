import { Route, Get, Security, Response, SuccessResponse } from 'tsoa';
import Bot from '../entities/Bot';

@Route('bots')
export default class BotResource {

	@Get('{id}')
	@Response('400', 'Bad request')
	@SuccessResponse('200')
	@Security('jwt', ['user'])
	public async Get(id: number): Promise<Bot> {
		//make db call and return bot object
	}
}
