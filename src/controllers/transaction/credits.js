import { prisma } from '../../utils';

export function credits(root) {
	return prisma.transaction.findUnique({ where: { id: root.id } }).credits();
}
