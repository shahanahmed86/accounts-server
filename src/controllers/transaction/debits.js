import { prisma } from '../../utils';

export function debits(root) {
	return prisma.transaction.findUnique({ where: { id: root.id } }).debits();
}
