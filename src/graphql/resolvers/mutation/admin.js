import { adminController } from '../../../controllers';

const admin = {
	signInAdmin: (...args) => adminController.signInAdmin(...args),
	signOutAdmin: (...args) => adminController.signOutAdmin(...args)
};

export default admin;
