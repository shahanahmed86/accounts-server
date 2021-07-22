import { Router } from 'express';
import { IN_PROD } from '../../config';
import { adminController, middleware } from '../../controllers';
import { checkAuth, checkGuest } from '../middleware';
const router = Router();

//downloading files
router.get(
	`/logged-in`,
	(...args) => checkAuth(...args, true, false),
	async (...args) => {
		const [, res] = args;
		try {
			const result = await middleware.restConverter(...args, adminController.loggedInAdmin);
			res.status(200).json(result);
		} catch (error) {
			if (!IN_PROD) console.error(error);
			res.status(400).send(error.message);
		}
	}
);

router.post(
	`/sign-in`,
	(...args) => checkGuest(...args, true, false),
	async (...args) => {
		const [, res] = args;
		try {
			const result = await middleware.restConverter(...args, adminController.signInAdmin);
			res.status(200).json(result);
		} catch (error) {
			if (!IN_PROD) console.error(error);
			res.status(400).send(error.message);
		}
	}
);

router.post(
	`/sign-out`,
	(...args) => checkAuth(...args, true, false),
	async (...args) => {
		const [, res] = args;
		try {
			await middleware.restConverter(...args, adminController.signOutAdmin);
			res.status(200).send('You"ve successfully signed out...');
		} catch (error) {
			if (!IN_PROD) console.error(error);
			res.status(400).send(error.message);
		}
	}
);

export default router;
