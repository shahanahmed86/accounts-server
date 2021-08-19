import { userController } from '../../../controllers';

const User = {
	firstName: (...args) => userController.firstName(...args),
	lastName: (...args) => userController.lastName(...args),
	email: (...args) => userController.email(...args),
	cell: (...args) => userController.cell(...args),
	avatar: (...args) => userController.avatar(...args),
	signupVia: (...args) => userController.signupVia(...args),
	heads: (...args) => userController.heads(...args),
	entries: (...args) => userController.entries(...args),
	transactions: (...args) => userController.transactions(...args)
};

export default User;
