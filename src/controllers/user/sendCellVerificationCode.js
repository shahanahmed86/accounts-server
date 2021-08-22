import { prisma, checkData, sendOTPToCell } from '../../utils';
import { IN_PROD } from '../../config';

export async function sendCellVerificationCode(_, { cell, ...data }, context) {
	try {
		const user = await checkData({
			tableRef: 'user',
			key: 'cell',
			value: cell,
			title: 'User'
		});

		if (user.cellVerified) {
			return {
				success: false,
				message: 'Your cell is already verified'
			};
		}
		data.otp = await sendOTPToCell(cell);

		await prisma.user.update({ where: { id: user.id }, data });
		return {
			success: true,
			message: 'Please check OTP in your cell'
		};
	} catch (error) {
		if (!IN_PROD) console.error(error);
		return {
			success: false,
			message: `Cell Verification failed due to ${error.message}`,
			debugMessage: error.message
		};
	}
}
