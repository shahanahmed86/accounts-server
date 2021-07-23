import { userController } from '../../../controllers';

const User = {
	password: (...args) => userController.password(...args),
	socials: (...args) => userController.socials(...args),
	avatar: (...args) => userController.avatar(...args)
};

export default User;
