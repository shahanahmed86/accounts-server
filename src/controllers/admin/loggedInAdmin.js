export function loggedInAdmin(_, __, context) {
	return context.res.locals.user;
}
