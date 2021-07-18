import { userController } from '../../../controllers';

const User = {
	password: (...args) => userController.password(...args)
};

export default User;
