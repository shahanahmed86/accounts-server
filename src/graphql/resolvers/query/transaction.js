import { transactionController } from '../../../controllers';

const transaction = {
	transactions: (...args) => transactionController.transactions(...args),
	transaction: (...args) => transactionController.transaction(...args)
};

export default transaction;
