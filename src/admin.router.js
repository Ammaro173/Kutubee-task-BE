// const AdminBro = require('admin-bro');
const { default: AdminBro } = require('admin-bro');
// const { buildRouter } = require('admin-bro-expressjs'); // no auth
const { buildAuthenticatedRouter } = require('admin-bro-expressjs');
const express = require('express');
// const app = express();
const argon2 = require('argon2');

require('dotenv').config();

// to save login eachtime serverrestart install connect-mongo
// const mongoose = require('mongoose');
// const session = require('express-session');
const MongoStore = require('connect-mongo');

const { User } = require('./users/users.enitity');

// let store = new MongoStore({
// 	collection: 'sessions',
// });
// MongoStore.create({ mongoUrl: process.env.MONGO_URI })
/**
 *
 * @param {AdminBro} admin
 * @returns {express.Router} router
 */
const buildAdminRouter = (admin) => {
	const router = buildAuthenticatedRouter(
		admin,
		{
			cookieName: 'admin-bro',
			cookiePassword: 'admin-bro-password',
			// need to install express-session and add it to dependencies in package.json
			authenticate: async (email, password) => {
				const user = await User.findOne({ email });
				if (user && (await argon2.verify(user.encryptedPassword, password))) {
					return user;
				}
				return null;
				// if (company) {
				// 	const isPasswordValid = await argon2.verify(company.encryptedPassword, password);
				// 	if (isPasswordValid) {
				// 		return company;
				// 	}
				// }
				// return null;
			},
		},
		null,
		{
			store: MongoStore.create({
				mongoUrl: process.env.MONGO_DB,
			}),
			resave: false,
			saveUninitialized: true,
		}
	);
	return router;
};

module.exports = buildAdminRouter;
