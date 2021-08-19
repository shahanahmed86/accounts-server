import admin from './admin';
import user from './user';
import head from './head';

const Query = {
	...admin,
	...user,
	...head
};

export default Query;
