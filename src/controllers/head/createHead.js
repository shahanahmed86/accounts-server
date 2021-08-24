import { ApolloError } from 'apollo-server-errors';
import { checkData, prisma } from '../../utils';
import { IN_PROD } from '../../config';

export async function createHead(_, { userId, ...data }, context) {
	try {
		const { id: sessionUserId, role } = context.res.locals.user;
		if (role === 'admin' && !userId) throw new ApolloError('User ID is required...');

		if (role === 'user') {
			data.user = {
				connect: { id: sessionUserId }
			};
		} else {
			await checkData({
				tableRef: 'user',
				key: 'id',
				value: userId,
				title: 'User',
				checkSuspension: true
			});
			data.user = {
				connect: { id: userId }
			};
		}

		let parent;
		if (data.parentId) {
			parent = await checkData({
				tableRef: 'head',
				key: 'id',
				value: data.parentId,
				title: 'Parent Head',
				checkSuspension: true,
				relatedTableRef: 'user',
				relatedKey: 'id',
				relatedValue: role === 'admin' ? userId : sessionUserId
			});
			if (parent.isTransactable) throw new ApolloError('Select Head is only for transaction...');

			data.nature = parent.nature;

			await checkData({
				tableRef: 'head',
				key: 'label',
				value: data.label,
				title: 'Head',
				checkDuplication: true,
				relatedTableRef: 'parent',
				relatedKey: 'id',
				relatedValue: data.parentId
			});
		}

		return prisma.head.create({ data });
	} catch (error) {
		if (!IN_PROD) console.error(error);
		throw new ApolloError(error.message);
	}
}
