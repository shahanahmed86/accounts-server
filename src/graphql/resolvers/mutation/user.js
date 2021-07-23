import { userController } from '../../../controllers';

const user = {
	createUser: (...args) => userController.createUser(...args),
	signInUser: (...args) => userController.signInUser(...args),
	signOutUser: (...args) => userController.signOutUser(...args)
};

export default user;
