import { headController } from '../../../controllers';

const head = {
	heads: (...args) => headController.heads(...args),
	head: (...args) => headController.head(...args)
};

export default head;
