const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST /api/game/launch
// @desc    Launch a game session
// @access  Private
router.post('/launch', authMiddleware, gameController.launchGame);

// @route   POST /api/game/score
// @desc    Submit score after game play
// @access  Private
router.post('/score', authMiddleware, gameController.submitScore);

// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)
// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)// @route   GET /api/game/leaderboard/:gameId
// @desc    Get top 10 players for a specific game
// @access  Public (optional: make Private)
router.get('/leaderboard/:gameId', gameController.getLeaderboard);

module.exports = router;
