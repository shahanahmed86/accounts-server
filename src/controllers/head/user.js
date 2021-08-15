import { prisma } from '../../utils';

export function user(root) {
	return prisma.head.findUnique({ where: { id: root.id } }).user();
}
