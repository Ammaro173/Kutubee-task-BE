const { default: AdminBro } = require('admin-bro');

// const DashboardPage = require('../.adminbro/.entry');

// register adapter for adminBro (mongooese)
const AdminBroMongoose = require('admin-bro-mongoose');

AdminBro.registerAdapter(AdminBroMongoose);

// const { Company } = require('./companies/companies.enitity');
const AdminUser = require('./users/users.admin');
const AdminMemoryGames = require('./games/memorygame/memory.game.admin');

// const { MemoryGames } = require('./games/memorygame/memory.game.entity');
const { QuizGames } = require('./games/quizgame/quiz.game.entity');

/** @type {import('admin-bro').AdminBroOptions} */
const options = {
	resources: [AdminUser, AdminMemoryGames, QuizGames],

	// dashboard: {
	// 	handler: async () => {},
	// 	component: AdminBro.bundle('./my-dashboard-component'),
	// },
	rootPath: '/admin',
};

module.exports = options;
