import { adminController } from '../../../controllers';

const admin = {
	loggedInAdmin: (...args) => adminController.loggedInAdmin(...args)
};

export default admin;
