import { transactionController } from '../../../controllers';

const transaction = {
	createTransaction: (...args) => transactionController.createTransaction(...args)
};

export default transaction;
