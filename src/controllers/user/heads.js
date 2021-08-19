import { filterRecordForUser, prisma } from '../../utils';

export function heads(root, _, context) {
	const where = filterRecordForUser(context);
	return prisma.user.findUnique({ where: { id: root.id } }).heads({ where });
}
