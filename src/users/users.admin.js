const AdminBro = require('admin-bro');

const { after: passwordAfterHook, before: passwordBeforeHook } = require('./actions/password.hook');

const { User } = require('./users.enitity');

/** @type {AdminBro.ResourceOptions} */
const options = {
	properties: {
		encryptedPassword: {
			isVisible: false,
		},
		// profilePhotoLocation: {
		// 	isVisible: false,
		// },
		password: {
			type: 'password',
		},
		// uploadImage: {
		// 	components: {
		// 		edit: AdminBro.bundle('../games/memorygame/components/upload-image.edit.tsx'),
		// 		list: AdminBro.bundle('../games/memorygame/components/upload-image.list.tsx'),
		// 	},
		// },
	},
	actions: {
		new: {
			after: passwordAfterHook,
			before: passwordBeforeHook,
		},
		edit: {
			after: passwordAfterHook,
			before: passwordBeforeHook,
		},
	},
};

module.exports = {
	options,
	resource: User,
};
