import * as express from 'express';
import * as methodOverride from 'method-override';
import * as bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
