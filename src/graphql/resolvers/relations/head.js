import { headController } from '../../../controllers';

const Head = {
	parent: (...args) => headController.parent(...args),
	children: (...args) => headController.children(...args),
	user: (...args) => headController.user(...args),
	entries: (...args) => headController.entries(...args)
};

export default Head;
