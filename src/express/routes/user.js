import { Router } from 'express';
import { IN_PROD } from '../../config';
import { middleware, userController } from '../../controllers';
import { checkGuest } from '../middleware';

const router = Router();

router.get(
	`/verifyEmail/:token`,
	(...args) => checkGuest(...args, false, true),
	async (...args) => {
		try {
			const [, res] = args;
			const redirectUrl = await middleware.restConverter(...args, userController.verifyEmail);

			res.status(200).redirect(redirectUrl);
		} catch (error) {
			if (!IN_PROD) console.error(error);
			res.status(400).send(error.message);
		}
	}
);

export default router;
