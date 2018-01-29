import * as express from 'express';
import * as path from 'path';
import config from './../../config';

const app: express.Application = express();

app.get('/', (req: express.Request, res: express.Response) => {
	res.send('aaa');
})
	.listen(config.webserver.port);
