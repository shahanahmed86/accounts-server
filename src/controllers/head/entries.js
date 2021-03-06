import { filterRecordForUser, prisma } from '../../utils';

export function entries(root, _, context) {
	const where = filterRecordForUser(context);
	return prisma.head.findUnique({ where: { id: root.id } }).entries({ where });
}
