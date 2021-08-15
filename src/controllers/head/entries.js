import { prisma } from '../../utils';

export function entries(root) {
	return prisma.head.findUnique({ where: { id: root.id } }).entries();
}
