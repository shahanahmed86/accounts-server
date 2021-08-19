import { filterRecordForUser, prisma } from '../../utils';

export function credits(root) {
	const where = filterRecordForUser(context);
	return prisma.transaction.findUnique({ where: { id: root.id } }).credits({ where });
}
