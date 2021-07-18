import { userController } from '../../../controllers';

const user = {
	signInUser: (...args) => userController.signInUser(...args),
	signOutUser: (...args) => userController.signOutUser(...args)
};

export default user;
