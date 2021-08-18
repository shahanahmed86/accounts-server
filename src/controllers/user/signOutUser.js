import { AuthenticationError } from 'apollo-server-errors';
import { IN_PROD, SESSION_NAME } from '../../config';
import { signOut } from '../../utils';

export async function signOutUser(_, __, context) {
	try {
		return signOut(context.req, context.res);
	} catch (error) {
		if (!IN_PROD) console.error(error);
		throw new AuthenticationError(error.message);
	}
}
