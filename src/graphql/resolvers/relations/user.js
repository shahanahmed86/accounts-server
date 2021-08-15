import { userController } from '../../../controllers';

const User = {
	avatar: (...args) => userController.avatar(...args),
	socials: (...args) => userController.socials(...args),
	heads: (...args) => userController.heads(...args),
	transactions: (...args) => userController.transactions(...args),
};

export default User;
