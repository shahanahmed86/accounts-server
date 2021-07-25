import { userController } from '../../../controllers';

const User = {
	password: (...args) => userController.password(...args),
	social: (...args) => userController.social(...args),
	avatar: (...args) => userController.avatar(...args)
};

export default User;
