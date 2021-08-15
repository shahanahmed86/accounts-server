import { prisma } from '../../utils';

export function socials(root) {
	return prisma.user.findUnique({ where: { id: root.id } }).socials();
}
