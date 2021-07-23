import { prisma } from '../../utils';

export async function avatar(root) {
	const user = await prisma.user.findUnique({ where: { id: root.id }, include: { socials: true } });
	if (!user.avatar) {
		if (!user.socials || !user.socials.length) return null;

		const ind = Math.floor(Math.random() * user.socials.length);
		return user.socials[ind].avatar;
	}

	return user.avatar;
}
