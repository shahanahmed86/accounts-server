import { ApolloError } from 'apollo-server-errors';
import { checkData, prisma } from '../../utils';
import { IN_PROD } from '../../config';

export async function restoreSuspendedUser(_, { id }, context) {
	try {
		const user = await checkData({
			tableRef: 'user',
			key: 'id',
			value: id,
			title: 'User'
		});

		if (user.isSuspended) {
			await prisma.user.update({ where: { id }, data: { isSuspended: false } });
		}

		return user;
	} catch (error) {
		if (!IN_PROD) console.error(error);
		throw new ApolloError(error.message);
	}
}
