import express, { Express, Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

import routes from './api/routes';

const app: Express = express();
const port = process.env.PORT;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', routes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at localhost:${port}`);
});
