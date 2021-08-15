import { userController } from '../../../controllers';

const user = {
	users: (...args) => userController.users(...args),
	user: (...args) => userController.user(...args)
};

export default user;
