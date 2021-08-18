import { AuthenticationError } from 'apollo-server-errors';
import { ensureSignedIn, ensureSignedOut, getUserData } from '../utils';

export async function checkAuth(context, args) {
	const { shouldAdmin, shouldUser, doNotThrow = false } = args;
	if (shouldAdmin && 'adminId' in context.req.session) {
		ensureSignedIn(context.req, doNotThrow, 'adminId');

		const { adminId } = context.req.session;
		const admin = await getUserData(context, 'admin', 'id', adminId, 'Admin');
		delete admin.password;
		admin.role = 'admin';

		context.res.locals.user = admin;
	} else if (shouldUser && 'userId' in context.req.session) {
		ensureSignedIn(context.req, doNotThrow, 'userId');

		const { userId } = context.req.session;
		const user = await getUserData(context, 'user', 'id', userId, 'User', true);
		if (!user.emailVerified) throw new AuthenticationError('Please verify your email');
		else if (!user.cellVerified) throw new AuthenticationError('Please verify your cell');
		delete user.password;
		user.role = 'user';

		context.res.locals.user = user;
	} else {
		throw new AuthenticationError('You must be logged in');
	}
}

export function checkGuest(context, args) {
	const { shouldAdmin, shouldUser } = args;
	if (shouldAdmin) ensureSignedOut(context.req, 'adminId');
	else if (shouldUser) ensureSignedOut(context.req, 'userId');
	else throw new AuthenticationError('Invalid token');
}

export function restConverter(req, res, next, controller, root = null) {
	const context = { req, res, next };
	const args = { ...req.params, ...req.query, ...req.body };
	return controller(root, args, context);
}
