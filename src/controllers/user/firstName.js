import { prisma } from '../../utils';

export async function firstName(root) {
	const user = await prisma.user.findUnique({ where: { id: root.id }, include: { social: true } });
	if (user.firstName) return user.firstName;

	if (!user.social) return null;

	const [firstName] = user.social.displayName.split(' ');
	return firstName;
}
