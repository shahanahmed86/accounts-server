import bcrypt from 'bcryptjs';
import { IN_PROD } from '../../config';
import { checkData, prisma } from '../../utils';

export async function verifyCell(_, { cell, otp }, context) {
	try {
		const user = await checkData({
			tableRef: 'user',
			key: 'cell',
			value: cell,
			title: 'User',
			checkSuspension: true
		});
		if (user.cellVerified) {
			return {
				success: false,
				message: 'Cell is already verified'
			};
		}

		if (!bcrypt.compareSync(otp, user.otp)) {
			return {
				success: false,
				message: 'OTP mismatched'
			};
		}

		await prisma.user.update({ where: { id: user.id }, data: { cellVerified: true } });

		return {
			success: true,
			message: 'Cell is verified'
		};
	} catch (error) {
		if (!IN_PROD) console.error(error);
		return {
			success: false,
			message: 'Cell Verification failed',
			debugMessage: error.message
		};
	}
}
