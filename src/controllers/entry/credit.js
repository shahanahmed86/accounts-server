import { prisma } from '../../utils';

export function credit(root) {
	return prisma.entry.findUnique({ where: { id: root.id } }).credit();
}
