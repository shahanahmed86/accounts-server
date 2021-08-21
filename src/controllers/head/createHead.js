import { ApolloError } from 'apollo-server-errors';
import { checkData, prisma } from '../../utils';
import { IN_PROD } from '../../config';

export async function createHead(_, data, context) {
	try {
		const { id: userId, role } = context.res.locals.user;

		if (role === 'user') data.userId = userId;
		else {
			await checkData({
				tableRef: 'user',
				key: 'id',
				value: data.userId,
				title: 'User',
				checkSuspension: true
			});
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
				relatedValue: data.userId
			});
			if (parent.isTransactable) throw new ApolloError('Select Head is only for transaction...');
			if (parent.nature !== data.nature) throw new ApolloError('Invalid Nature selected...');

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
