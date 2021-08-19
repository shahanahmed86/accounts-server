import { prisma } from '../../utils';

export async function signupVia(root) {
	const user = await prisma.user.findUnique({ where: { id: root.id }, include: { social: true } });
	if (!user.signUpWithSocials || !user.social) return 'sign-up';

	return user.social.providerId;
}
