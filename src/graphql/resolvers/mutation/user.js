import { userController } from '../../../controllers';

const user = {
	createUser: (...args) => userController.createUser(...args),
	signInUser: (...args) => userController.signInUser(...args),
	suspendUser: (...args) => userController.suspendUser(...args),
	restoreSuspendedUser: (...args) => userController.restoreSuspendedUser(...args),
	sendEmailVerification: (...args) => userController.sendEmailVerification(...args),
	sendCellVerificationCode: (...args) => userController.sendCellVerificationCode(...args),
	verifyCell: (...args) => userController.verifyCell(...args),
	socialLogin: (...args) => userController.socialLogin(...args),
	signInUser: (...args) => userController.signInUser(...args),
	signOutUser: (...args) => userController.signOutUser(...args)
};

export default user;
