import { entryController } from '../../../controllers';

const Entry = {
	head: (...args) => entryController.head(...args),
	debit: (...args) => entryController.debit(...args),
	credit: (...args) => entryController.credit(...args),
	user: (...args) => entryController.user(...args)
};

export default Entry;
