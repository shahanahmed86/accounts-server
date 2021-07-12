import { AuthenticationError } from 'apollo-server-express';
import { SESS_NAME } from '../config';

const signedIn = (req, key) => req.session[key];

export const ensureSignedIn = (req, doNotThrow, key) => {
	if (!signedIn(req, key) && !doNotThrow) {
		throw new AuthenticationError('You must be signed in.');
	}
};

export const ensureSignedOut = (req) => {
	if (signedIn(req, key)) {
		throw new AuthenticationError('You are already signed in.');
	}
};

export const signOut = (req, res) =>
	new Promise((resolve, reject) => {
		req.session.destroy((err) => {
			if (err) reject(err);

			res.clearCookie(SESS_NAME);

			resolve(true);
		});
	});
