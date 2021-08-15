import { checkData } from '../../utils';

export function user(_, { id }, context) {
	const { role } = context.res.locals.user;
	if (role === 'admin') {
		return checkData({ tableRef: 'user', key: 'id', value: id, title: 'User' });
	} else {
		return context.res.locals.user;
	}
}
