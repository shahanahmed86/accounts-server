import { AuthenticationError } from 'apollo-server-express';
import { IN_PROD, SESS_NAME } from '../config';
import { checkData } from '.';

const signedIn = (req, key) => (key ? req.session[key] : req.session);

export const ensureSignedIn = (req, doNotThrow, key) => {
	if (!signedIn(req, key) && !doNotThrow) {
		throw new AuthenticationError('You must be signed in.');
	}
};

export const ensureSignedOut = (req, key) => {
	if (signedIn(req, key)) {
		throw new AuthenticationError('You are already signed in.');
	}
};

export const signOut = (req, res) => {
	return new Promise((resolve, reject) => {
		req.session.destroy((err) => {
			if (err) reject(err);

			res.clearCookie(SESS_NAME);

			resolve(true);
		});
	});
};

export const getUserData = async (
	context,
	tableRef,
	key,
	value,
	title,
	checkSuspension = false
) => {
	try {
		const user = await checkData({ tableRef, key, value, title, checkSuspension });

		return user;
	} catch (error) {
		if (!IN_PROD) console.error(error);
		await signOut(context.req, context.res);
		throw new AuthenticationError('Unauthorized Access detected...');
	}
};
