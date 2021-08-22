import { headController } from '../../../controllers';

const head = {
	createHead: (...args) => headController.createHead(...args),
	updateHead: (...args) => headController.updateHead(...args),
	suspendHead: (...args) => headController.suspendHead(...args),
	restoreSuspendHead: (...args) => headController.restoreSuspendHead(...args),
	transferAccountHead: (...args) => headController.transferAccountHead(...args)
};

export default head;
