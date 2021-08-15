import { prisma } from '../../utils';

export function parent(root) {
	return prisma.head.findUnique({ where: { id: root.id } }).parent();
}
