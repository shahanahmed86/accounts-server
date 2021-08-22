import { checkData, includeProperties, prisma, transferToHead } from '../../utils';
import { IN_PROD } from '../../config';
import { ApolloError } from 'apollo-server-express';

export async function suspendHead(_, { id, transferHeadId }, context) {
	try {
		if (transferHeadId && id === transferHeadId) {
			return {
				success: false,
				message: 'current and New Account Head is same'
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
			title: 'Head ID'
		};
		if (role === 'user') includeProperties(where, userQuery);
		const head = await checkData(where);

		if (head.isSuspended) {
			return {
				success: false,
				message: 'The Account is already suspended...'
			};
		}

		if (transferHeadId) {
			where.value = transferHeadId;
			where.title = 'New Head ID';
			const newHead = await checkData(where);

			await isHeadValidToTransfer(head, newHead);
		} else {
			const message = 'You must select a transfer Head ID to suspend this account';
			if (head.isTransactable) {
				const entries = await prisma.head.findFirst({ where: { id } }).entries();
				if (entries.length) {
					return {
						success: false,
						message
					};
				}
			} else {
				const children = await prisma.head.findFirst({ where: { id } }).children();
				if (children.length) {
					return {
						success: false,
						message
					};
				}
			}
		}

		await prisma.head.update({ where: { id }, data: { isSuspended: true } });

		return {
			success: true,
			message: 'The Account is suspended...'
		};
	} catch (error) {
		if (!IN_PROD) console.error(error);
		return {
			success: false,
			message: `The Account is not suspended due to ${error.message}`,
			debugMessage: error.message
		};
	}
}
