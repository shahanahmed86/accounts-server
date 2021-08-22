const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

(async () => {
	try {
		const data = {};
		data.admin = await prisma.admin.upsert({
			where: { username: 'admin' },
			update: {},
			create: {
				username: 'admin',
				password: bcrypt.hashSync('admin', 10)
			}
		});
		const userData = {
			cell: '+923362122588',
			cellVerified: true,
			email: 'shahan.khaan@gmail.com',
			emailVerified: true,
			firstName: 'Shahan',
			gender: 'MALE',
			lastName: 'Ahmed Khan',
			password: bcrypt.hashSync('123Abc456$', 10),
			username: 'shahanahmed86',
			heads: {
				createMany: {
					data: [
						{
							label: 'Asset',
							nature: 'ASSET'
						},
						{
							label: 'Expense',
							nature: 'EXPENSE'
						},
						{
							label: 'Revenue',
							nature: 'REVENUE'
						},
						{
							label: 'Liability',
							nature: 'LIABILITY'
						},
						{
							label: 'Equity',
							nature: 'EQUITY'
						}
					]
				}
			}
		};
		data.user = await prisma.user.upsert({
			where: { username: 'shahan' },
			update: {},
			create: userData
		});
		console.log('data', data);
	} catch (error) {
		console.error(error);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
})();
