const mongoose = require('mongoose');

const MemoryGame = new mongoose.Schema({
	GameNumber: { type: 'string', required: true, unique: true },
	GameQuestion: { type: 'string', required: true },
	Photos: { type: 'string' },
	profilePhotoLocation: { type: 'string' },
	audioLink: { type: 'string' },
});

const MemoryGames = mongoose.model('MemoryGames', MemoryGame);

module.exports = { MemoryGame, MemoryGames };
