import { filterRecordForUser, prisma } from '../../utils';

export function debits(root) {
	const where = filterRecordForUser(context);
	return prisma.transaction.findUnique({ where: { id: root.id } }).debits({ where });
}
