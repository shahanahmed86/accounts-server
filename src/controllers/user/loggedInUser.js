export function loggedInUser(_, __, context) {
	return context.res.locals.user;
}
