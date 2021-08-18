import { AuthenticationError } from 'apollo-server-express';
import admin from 'firebase-admin';
import { IN_PROD } from '../../config';
import { getOrCreateUser, getSocialUserData } from '../../utils';

export async function socialLogin(_, { token }, context) {
	try {
		const decodedToken = await admin.auth().verifyIdToken(token);
		const uid = decodedToken.uid;

		const userRecord = await getSocialUserData(uid);
		if (!userRecord.email) {
			throw new AuthenticationError('You need an email address to log-in with...');
		}

		const user = await getOrCreateUser(userRecord);

		context.req.session.userId = user.id;
	} catch (error) {
		if (!IN_PROD) console.error(error);
		throw new AuthenticationError(error.message);
	}
}
