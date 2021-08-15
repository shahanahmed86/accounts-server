import moment from 'moment';
import nodemailer from 'nodemailer';
import ejs from 'ejs';
import jwt from 'jsonwebtoken';
import { ApolloError } from 'apollo-server-express';
import {
	SMTP_HOST,
	SMTP_PORT,
	SMTP_USER,
	SMTP_PASS,
	IS_NODEMAILER_SECURE,
	BASE_URL,
	JWT_SECRET,
	IN_PROD
} from '../config';

function setupNodeMailer() {
	return nodemailer.createTransport({
		host: SMTP_HOST,
		port: SMTP_PORT,
		secure: IS_NODEMAILER_SECURE,
		auth: {
			user: SMTP_USER,
			pass: SMTP_PASS
		}
	});
}

export async function emailVerification({ id, username, email }) {
	try {
		const mailer = setupNodeMailer();

		const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: '1h' });

		const values = {
			action: 'Verify',
			title: 'Just press the button below to verify your account.',
			link: `${BASE_URL}/user/verifyEmail/${token}`,
			username,
			logoUrl: `${BASE_URL}/images/logo.png`
		};
		const data = await ejs.renderFile('/views/pages/verify.ejs', values);
		console.log(data);

		await mailer.sendMail({
			from: 'Admin <info@accounts-server.com>',
			to: email,
			subject: 'Account Verification',
			html: data,
			attachments: [
				{
					cid: 'logo',
					filename: 'logo.png',
					path: __dirname + '../assets/logo.png',
					contentType: 'image/png'
				}
			]
		});
	} catch (error) {
		if (!IN_PROD) console.error(error);
		throw new ApolloError(error.message);
	}
}

export function validateToken(token) {
	const decoded = jwt.verify(token, JWT_SECRET);
	const now = moment();
	const exp = moment(decoded.exp * 1000);
	const isExpired = now.isSameOrAfter(exp);

	if (isExpired) throw new ApolloError('Token expired');

	return decoded;
}
