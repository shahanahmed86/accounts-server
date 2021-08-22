import { ApolloError } from 'apollo-server-errors';
import { checkData, includeProperties, prisma } from '../../utils';
import { IN_PROD } from '../../config';

export async function updateHead(_, { id, ...data }, context) {
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
			title: 'Head ID',
			include: { children: true, entries: true },
			checkSuspension: true
		};
		if (role === 'user') includeProperties(where, userQuery);
		const head = await checkData(where);

		if (data.label) {
			const where = {
				tableRef: 'head',
				key: 'label',
				value: data.label,
				title: data.label,
				checkDuplication: true,
				checkSuspension: true,
				id
			};
			if (role === 'user') includeProperties(where, userQuery);
			await checkData(where);
		}

		if (data.isTransactable) {
			if (!head.parentId) throw new ApolloError('Root level head cannot be transactable...');
			if (!head.isTransactable && head.children.length) {
				throw new ApolloError('Cannot enable transactable because it has already children head...');
			}
		} else if (data.isTransactable === false) {
			if (head.isTransactable && head.entries.length) {
				throw new ApolloError('Cannot disable transactable because it has already transactions...');
			}
		}

		return prisma.head.update({ where: { id }, data });
	} catch (error) {
		if (!IN_PROD) console.error(error);
		throw new ApolloError(error.message);
	}
}
