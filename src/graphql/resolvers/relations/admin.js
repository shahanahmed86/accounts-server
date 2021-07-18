import { adminController } from '../../../controllers';

const Admin = {
	password: (...args) => adminController.password(...args)
};

export default Admin;
