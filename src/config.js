export const {
	NODE_ENV = 'development',

	APP_HOST = 'localhost',
	APP_HTTP = 'http:',
	APP_WS = 'ws:',

	JWT_SECRET = 'jwt_secret',

	SESS_NAME = 'sid',
	SESS_SECRET = 'ssh!secret!',

	REDIS_HOST = 'localhost',
	REDIS_PASSWORD = 'redis_secret',

	CLOUDINARY_API,
	CLOUDINARY_SECRET,
	CLOUDINARY_NAME
} = process.env;

export const APP_PORT = +process.env.APP_PORT || 4000;

export const IN_PROD = NODE_ENV === 'production';

export const BCRYPT_SALT = +process.env.BCRYPT_SALT || 10;

export const SESS_LIFETIME = +process.env.SESS_LIFETIME || 7200000;

export const REDIS_PORT = +process.env.REDIS_PORT || 6379;
