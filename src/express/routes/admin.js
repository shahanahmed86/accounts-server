import { Router } from 'express';
import { IN_PROD } from '../../config';
import { adminController, middleware } from '../../controllers';
import { checkAuth, checkGuest } from '../middleware';
const router = Router();

router.get(
	'/logged-in',
	(...args) => checkAuth(...args, true, false),
	async (...args) => {
		try {
			const [, res] = args;
			const result = await middleware.restConverter(...args, adminController.loggedInAdmin);
			res.status(200).json(result);
		} catch (error) {
			if (!IN_PROD) console.error(error);
			res.status(400).send(error.message);
		}
	}
);

router.post(
	'/sign-in',
	(...args) => checkGuest(...args, true, false),
	async (...args) => {
		try {
			const [, res] = args;
			const result = await middleware.restConverter(...args, adminController.signInAdmin);
			res.status(200).json(result);
		} catch (error) {
			if (!IN_PROD) console.error(error);
			res.status(400).send(error.message);
		}
	}
);

router.post(
	'/sign-out',
	(...args) => checkAuth(...args, true, false),
	async (...args) => {
		try {
			const [, res] = args;
			await middleware.restConverter(...args, adminController.signOutAdmin);
			res.status(200).send('You"ve successfully signed out');
		} catch (error) {
			if (!IN_PROD) console.error(error);
			res.status(400).send(error.message);
		}
	}
);

export default router;
