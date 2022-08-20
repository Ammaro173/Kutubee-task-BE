const mongoose = require('mongoose');

const QuizGame = new mongoose.Schema({
	QuestionNo: { type: 'number', required: true },
	QuestionTag: { type: 'string', required: true },
	Answer1: { type: 'string', required: true },
	isCorrect1: { type: 'boolean' },
	Answer2: { type: 'string', required: true },
	isCorrect2: { type: 'boolean' },
	Answer3: { type: 'string', required: true },
	isCorrect3: { type: 'boolean' },
	Answer4: { type: 'string', required: true },
	isCorrect4: { type: 'boolean' },
});

const QuizGames = mongoose.model('QuizGames', QuizGame);

module.exports = { QuizGame, QuizGames };
