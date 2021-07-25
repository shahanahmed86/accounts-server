import { prisma } from '../../utils';

export function social(root) {
	return prisma.user.findUnique({ where: { id: root.id } }).social();
}
