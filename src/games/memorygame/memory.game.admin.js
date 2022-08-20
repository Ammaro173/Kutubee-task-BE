const { default: AdminBro } = require('admin-bro');

const { MemoryGames } = require('./memory.game.entity');
const { after: uploadAfterHook, before: uploadBeforeHook } = require('./actions/upload-image.hook');

/** @type {AdminBro.ResourceOptions} */
const options = {
	properties: {
		uploadImage: {
			components: {
				edit: AdminBro.bundle('./components/upload-image.edit.tsx'),
				list: AdminBro.bundle('./components/upload-image.list.tsx'),
			},
		},
		Photos: {
			isVisible: false,
		},
		profilePhotoLocation: {
			isVisible: false,
		},
	},
	actions: {
		new: {
			after: uploadAfterHook,
			before: uploadBeforeHook,
		},
		edit: {
			after: uploadAfterHook,
			before: uploadBeforeHook,
		},
	},
};

module.exports = {
	options,
	resource: MemoryGames,
};
