import { checkData, emailVerification } from '../../utils';
import { IN_PROD } from '../../config';

export async function sendEmailVerification(_, { email }, context) {
	try {
		const user = await checkData({
			tableRef: 'user',
			key: 'email',
			value: email,
			title: 'User'
		});

		if (user.emailVerified) {
			return {
				success: false,
				message: 'Your email is already verified'
			};
		}
		await emailVerification(user);
		return {
			success: true,
			message: 'Please check your email to verify'
		};
	} catch (error) {
		if (!IN_PROD) console.error(error);
		return {
			success: false,
			message: `Email Verification failed due to ${error.message}`,
			debugMessage: error.message
		};
	}
}
