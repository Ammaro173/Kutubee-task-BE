const { default: AdminBro } = require('admin-bro');

// argon2 for password encryption
const argon2 = require('argon2');

const { User } = require('./users.enitity');

/**
 * @type{AdminBro.ResourceOptions}
 */
const options = {
	properties: {
		encryptedPassword: {
			isVisible: false,
		},
		password: {
			type: 'password',
		},
	},
	actions: {
		//install argon2 package and add it to dependencies in package.json
		new: {
			// we used after hook to show the error message when someone leaves the password field empty
			after: async (response) => {
				if (response.record && response.record.errors) {
					response.record.errors.password = response.record.errors.encryptedPassword;
				}
				return response;
			},
			// after:async (response)=>{
			//     const {password} = response.data;
			//     const {encryptedPassword} = await argon2.hash(password);
			//     response.data.encryptedPassword = encryptedPassword;
			// }
			before: async (request) => {
				//post method should be small letter not POST
				if (request.method === 'post') {
					const { password, ...otherParams } = request.payload;

					if (password) {
						const encryptedPassword = await argon2.hash(password);

						return {
							...request,
							payload: {
								...otherParams,
								encryptedPassword,
							},
						};
					}
				}
				// dont forget this return statement!!!!
				return request;
			},
		},
		//edit actions shoud have the same hooks as new (but not always!!)
		edit: {
			after: async (response) => {
				if (response.record && response.record.errors) {
					response.record.errors.password = response.record.errors.encryptedPassword;
				}
				return response;
			},
			before: async (request) => {
				//post method should be small letter not POST
				if (request.method === 'post') {
					const { password, ...otherParams } = request.payload;

					if (password) {
						const encryptedPassword = await argon2.hash(password);

						return {
							...request,
							payload: {
								...otherParams,
								encryptedPassword,
							},
						};
					}
				}
				// dont forget this return statement!!!!
				return request;
			},
		},
		// new: {
		// 	before: async (request, response, context) => {
		// 		const { password } = request.body;
		// 		if (password) {
		// 			context.record.encryptedPassword = await bcrypt.hash(password, 10);
		// 		}
		// 	},
		// },
	},
};

module.exports = {
	options,
	resource: User,
	// resource : AdminBro.Resource.extend({
	//     options,
	// }),
};
