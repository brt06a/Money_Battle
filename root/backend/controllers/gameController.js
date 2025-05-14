const Game = require('../models/Game'); // if you're storing games
const User = require('../models/User');
const Transaction = require('../models/Transaction');

// @desc    Launch a game (track session)
// @route   POST /api/game/launch
// @access  Private
exports.launchGame = async (req, res) => {
  const { gameId } = req.body;

  if (!gameId) {
    return res.status(400).json({ message: 'Game ID is required' });
  }

  try {
    // Optional: validate game exists if you use a Game model
    res.status(200).json({
      message: 'Game session started',
      gameUrl: `/games/game${gameId}.html`,
    });
  } catch (error) {
    console.error('Launch error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// @desc    Submit score after game ends
// @route   POST /api/game/score
// @access  Private
exports.submitScore = async (req, res) => {
  const { score, gameId } = req.body;

  if (!score || !gameId) {
    return res.status(400).json({ message: 'Score and Game ID required' });
  }

  try {
    let multiplier = 1;
    if (req.user.isPremium) {
      multiplier = 2; // Example: double score for premium users
    }

    const adjustedScore = score * multiplier;

    // Update user's top score
    if (!req.user.scores) req.user.scores = {};
    const prevScore = req.user.scores[gameId] || 0;
    req.user.scores[gameId] = Math.max(prevScore, adjustedScore);
    req.user.walletBalance += adjustedScore / 100; // reward: ₹0.01 per point
    await req.user.save();

    // Optional: Record reward transaction
    const tx = new Transaction({
      user: req.user._id,
      type: 'reward',
      amount: adjustedScore / 100,
      status: 'completed',
      description: `Game reward from game ${gameId}`,
    });
    await tx.save();

    res.status(200).json({
      message: 'Score submitted',
      finalScore: adjustedScore,
      walletBalance: req.user.walletBalance,
    });
  } catch (err) {
    console.error('Score submission error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get top 10 players for a game
// @route   GET /api/game/leaderboard/:gameId
// @access  Public or Private
exports.getLeaderboard = async (req, res) => {
  const { gameId } = req.params;

  try {
    const topPlayers = await User.find({ [`scores.${gameId}`]: { $exists: true } })
      .sort({ [`scores.${gameId}`]: -1 })
      .select('username scores')
      .limit(10);

    const leaderboard = topPlayers.map((player, index) => ({
      rank: index + 1,
      username: player.username,
      score: player.scores[gameId],
    }));

    res.status(200).json({ leaderboard });
  } catch (err) {
    console.error('Leaderboard error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
