import admin from './admin';
import user from './user';
import head from './head';

const Mutation = {
	...admin,
	...user,
	...head
};

export default Mutation;
