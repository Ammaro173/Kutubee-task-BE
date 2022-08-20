const path = require('path');
const fs = require('fs');
const AdminBro = require('admin-bro');
const { MemoryGames } = require('../memory.game.entity');

/** @type {AdminBro.After<AdminBro.ActionResponse>} */
const after = async (response, request, context) => {
	const { record, uploadImage } = context;
	// console.log('coooooooooooooo', context);
	// console.log('reeeeeeeeee', record);

	if (record.isValid() && uploadImage) {
		const filePath = path.join('uploads', uploadImage.name);

		await fs.promises.mkdir(path.dirname(filePath), { recursive: true });

		await fs.promises.rename(uploadImage.path, filePath);

		// await record.storeParams({ uploadImage: `/${filePath}` });
		await record.update({ uploadImage: `/${filePath}` });
		// await record.save({ uploadImage: `/${filePath}` });

		// console.log('recordNEWWWWWWWWWWWWWWW', record);

		// MemoryGames.update(uploadImage);
	}

	return response;
};

/** @type {AdminBro.Before} */
const before = async (request, context) => {
	console.log('beforeReq', request);
	console.log('beforeCont', context);

	if (request.method === 'post') {
		const { uploadImage, ...otherParams } = request.payload;

		// eslint-disable-next-line no-param-reassign
		context.uploadImage = uploadImage;

		return {
			...request,
			payload: otherParams,
		};
	}
	return request;
};

module.exports = { after, before };
