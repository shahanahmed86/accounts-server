import { headController } from '../../../controllers';

const head = {
	createHead: (...args) => headController.createHead(...args),
	updateHead: (...args) => headController.updateHead(...args),
	suspendHead: (...args) => headController.suspendHead(...args),
	restoreSuspendedHead: (...args) => headController.restoreSuspendedHead(...args),
	transferAccountHead: (...args) => headController.transferAccountHead(...args)
};

export default head;
