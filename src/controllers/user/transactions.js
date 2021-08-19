import { filterRecordForUser, prisma } from '../../utils';

export function transactions(root, _, context) {
	const where = filterRecordForUser(context);
	return prisma.user.findUnique({ where: { id: root.id } }).transactions({ where });
}
