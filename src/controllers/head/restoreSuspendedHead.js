import { checkData, includeProperties, prisma } from '../../utils';
import { IN_PROD } from '../../config';

export async function restoreSuspendedHead(_, { id }, context) {
	try {
		const { id: userId, role } = context.res.locals.user;

		const userQuery = {
			relatedTableRef: 'user',
			relatedKey: 'id',
			relatedValue: userId
		};
		const where = {
			tableRef: 'head',
			key: 'id',
			value: id,
			title: 'Head ID'
		};
		if (role === 'user') includeProperties(where, userQuery);
		const head = await checkData(where);

		if (!head.isSuspended) {
			return {
				success: false,
				message: 'The Account is already restored from suspension...'
			};
		}

		await prisma.head.update({ where: { id }, data: { isSuspended: false } });

		return {
			success: true,
			message: 'The Account is restored from suspension...'
		};
	} catch (error) {
		if (!IN_PROD) console.error(error);
		return {
			success: false,
			message: `The Account is not restored from suspension due to ${error.message}`,
			debugMessage: error.message
		};
	}
}
