const admin = {
	loggedInAdmin: async (_, __, context) => {
		return context.req.user;
	}
};

export default admin;
