import { prisma } from '../../utils';

export function children(root) {
	return prisma.head.findUnique({ where: { id: root.id } }).children();
}
