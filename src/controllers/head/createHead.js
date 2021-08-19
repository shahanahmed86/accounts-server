import { ApolloError } from 'apollo-server-errors';
import { checkData, prisma } from '../../utils';
import { IN_PROD } from '../../config';

export async function createHead(_, data, context) {
	try {
		/** data @params
		 * label: String!
		 * nature: Nature!
		 * parentId: String
		 * userId: String // when user is creating then ID will be taken from session
		 * isTransactable: Boolean
		 **/
		const { id: userId, role } = context.res.locals.user;

		await checkData({
			tableRef: 'head',
			key: 'label',
			value: data.label,
			title: 'Head',
			checkDuplication: true
		});

		if (data.parentId) {
			const parent = await checkData({
				tableRef: 'head',
				key: 'id',
				value: data.parentId,
				title: 'Parent Head',
				checkSuspension: true
			});
			if (parent.isTransactable) throw new ApolloError('Select Head is only for transaction...');
		}

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

		return prisma.head.create({ data });
	} catch (error) {
		if (!IN_PROD) console.error(error);
		throw new ApolloError(error.message);
	}
}
