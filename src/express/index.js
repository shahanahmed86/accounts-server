import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import session from 'express-session';

import {
	REDIS_HOST,
	REDIS_PASSWORD,
	REDIS_PORT,
	SESS_NAME,
	SESS_SECRET,
	SESS_LIFETIME,
	IN_PROD
} from '../config';

import { adminRoutes } from './routes';

const app = express();

// parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// cors
app.use(cors());

// logs
app.use(morgan('dev'));

// x-powered-by
app.disable('x-powered-by');

const RedisStore = connectRedis(session);

const client = new Redis({ host: REDIS_HOST, port: REDIS_PORT, password: REDIS_PASSWORD });
const store = new RedisStore({ client });

app.use(
	session({
		store,
		name: SESS_NAME,
		secret: SESS_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: SESS_LIFETIME,
			sameSite: true,
			secure: IN_PROD
		}
	})
);

app.use('/admin', adminRoutes);

export default app;
