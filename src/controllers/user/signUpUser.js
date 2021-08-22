import bcrypt from 'bcryptjs';
import { ApolloError } from 'apollo-server-errors';
import {
	checkData,
	emailVerification,
	createNatureOfAccounts,
	prisma,
	saveFileLocally,
	sendOTPToCell,
	validations
} from '../../utils';
import { IN_PROD, BCRYPT_SALT } from '../../config';
import moment from 'moment';

export async function signUpUser(_, { avatar, ...args }, context) {
	try {
		await validations.validate(validations.signUp, args);
		const { password, confirmPassword, ...data } = args;

		await checkData({
			tableRef: 'user',
			key: 'username',
			value: data.username,
			checkDuplication: true,
			title: data.username
		});

		data.password = bcrypt.hashSync(password, BCRYPT_SALT);
		data.avatar = await saveFileLocally(avatar);
		data.otp = await sendOTPToCell(data.cell);
		data.otpExpiresAt = moment().add(1, 'h').toDate();

		createNatureOfAccounts(data);
		const user = await prisma.user.create({ data });

		await emailVerification(user);

		return user;
	} catch (error) {
		if (!IN_PROD) console.error(error);
		throw new ApolloError(error.message);
	}
}
