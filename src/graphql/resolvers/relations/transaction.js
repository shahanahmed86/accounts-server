import { transactionController } from '../../../controllers';

const Transaction = {
	debits: (...args) => transactionController.debits(...args),
	credits: (...args) => transactionController.credits(...args),
	user: (...args) => transactionController.user(...args)
};

export default Transaction;
