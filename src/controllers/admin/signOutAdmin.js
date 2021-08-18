import { AuthenticationError } from 'apollo-server-errors';
import { IN_PROD } from '../../config';
import { signOut } from '../../utils';

export async function signOutAdmin(_, __, context) {
	try {
		return signOut(context.req, context.res, true);
	} catch (error) {
		if (!IN_PROD) console.error(error);
		throw new AuthenticationError(error.message);
	}
}
