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
	CLOUDINARY_NAME,

	SMTP_HOST = 'smtp.gmail.com',
	SMTP_USER,
	SMTP_PASS,

	TWILIO_ACCOUNT_SID,
	TWILIO_AUTH_TOKEN,
	TWILIO_PHONE_NO
} = process.env;

export const APP_PORT = +process.env.APP_PORT || 4000;

export const IN_PROD = NODE_ENV === 'production';

export const BCRYPT_SALT = +process.env.BCRYPT_SALT || 10;

export const SESS_LIFETIME = +process.env.SESS_LIFETIME || 7200000;

export const REDIS_PORT = +process.env.REDIS_PORT || 6379;

export const SMTP_PORT = +process.env.SMTP_PORT || 465;

export const IS_NODEMAILER_SECURE = SMTP_PORT === 465;

export const BASE_URL = `${APP_HTTP}//${APP_HOST}:${APP_PORT}`;
