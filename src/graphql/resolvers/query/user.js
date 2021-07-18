import { userController } from '../../../controllers';

const user = {
	loggedInUser: (...args) => userController.loggedInUser(...args)
};

export default user;
