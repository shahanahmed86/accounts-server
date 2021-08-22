import {
	checkData,
	includeProperties,
	isHeadValidToTransfer,
	prisma,
	transferToHead
} from '../../utils';
import { IN_PROD } from '../../config';
import { ApolloError } from 'apollo-server-express';

export async function transferAccountHead(_, { id, transferHeadId }, context) {
	try {
		if (id === transferHeadId) {
			return {
				success: false,
				message: 'Current and New Account Head is same'
			};
		}
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
			checkSuspension: true
		};
		if (role === 'user') includeProperties(where, userQuery);
		const head = await checkData(where);

		where.value = transferHeadId;
		where.title = 'New Head ID';
		const newHead = await checkData(where);

		await isHeadValidToTransfer(head, newHead);

		return {
			success: true,
			message: 'The Account is transferred...'
		};
	} catch (error) {
		if (!IN_PROD) console.error(error);
		return {
			success: false,
			message: `The Account is not transferred due to ${error.message}`,
			debugMessage: error.message
		};
	}
}
