const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
	UserName: { type: 'string', required: true },
	email: { type: 'string', required: true },
	encryptedPassword: { type: 'string', required: true }, //autospaceing in the engine will appear for camel case ++ we can hide this from user interface in admin.options
});

const User = mongoose.model('User', UsersSchema);

module.exports = { UsersSchema, User };
