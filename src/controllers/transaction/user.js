import { prisma } from '../../utils';

export function user(root) {
	return prisma.transaction.findUnique({ where: { id: root.id } }).user();
}
