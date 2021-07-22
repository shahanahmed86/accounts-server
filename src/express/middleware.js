import { IN_PROD } from '../config';
import { middleware } from '../controllers';

export function checkGuest(req, res, next, shouldAdmin, shouldUser) {
	const context = { req, res };
	const args = { shouldAdmin, shouldUser };
	try {
		middleware.checkGuest(context, args);
		next();
	} catch (error) {
		if (!IN_PROD) console.error(error);
		res.status(400).send(error.message);
	}
}

export async function checkAuth(req, res, next, shouldAdmin, shouldUser) {
	const context = { req, res };
	const args = { shouldAdmin, shouldUser };
	try {
		await middleware.checkAuth(context, args);
		next();
	} catch (error) {
		if (!IN_PROD) console.error(error);
		res.status(400).send(error.message);
	}
}
