import { prisma } from '../../utils';

export function users() {
	return prisma.user.findMany();
}
