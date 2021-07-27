import bcrypt from 'bcryptjs';
import twilio from 'twilio';
import { ApolloError } from 'apollo-server-express';
import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NO, BCRYPT_SALT } from '../config';

export async function sendOTPToCell(cell) {
	try {
		const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
			lazyLoading: true
		});

		const otp = getOtp();

		await client.messages.create({
			body: `Your One Time password is: ${otp}`,
			from: TWILIO_PHONE_NO,
			to: cell
		});

		return bcrypt.hashSync(otp, BCRYPT_SALT);
	} catch (error) {
		throw new ApolloError(error.message);
	}
}

function getOtp() {
	return Math.random().toString().substr(7, 4);
}
