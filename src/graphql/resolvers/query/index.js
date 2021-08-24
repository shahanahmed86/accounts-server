import admin from './admin';
import user from './user';
import head from './head';
import transaction from './transaction';

const Query = {
	...admin,
	...user,
	...head,
	...transaction
};

export default Query;
