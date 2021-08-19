import { prisma } from '../../utils';

export async function lastName(root) {
	const user = await prisma.user.findUnique({ where: { id: root.id }, include: { social: true } });
	if (user.lastName) return user.lastName;

	if (!user.social) return null;

	const [, ...lastName] = user.social.displayName.split(' ');
	return lastName.join(' ');
}
