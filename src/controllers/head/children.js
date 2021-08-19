import { filterRecordForUser, prisma } from '../../utils';

export function children(root, _, context) {
	const where = filterRecordForUser(context);
	return prisma.head.findUnique({ where: { id: root.id } }).children({ where });
}
