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
	SESSION_NAME,
	SESSION_SECRET,
	SESSION_LIFETIME,
	IN_PROD
} from '../config';

import { adminRoutes, imageRoutes, userRoutes } from './routes';

const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

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
		name: SESSION_NAME,
		secret: SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: SESSION_LIFETIME,
			sameSite: true,
			secure: IN_PROD
		}
	})
);

// dedicated routes
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

// generic routes
app.use('/images', imageRoutes);

export default app;
