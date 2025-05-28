const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Transaction = require('../models/Transaction');
const User = require('../models/User');

// @route   GET /api/wallet
// @desc    Get current wallet balance
// @access  Private
router.get('/wallet', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('walletBalance');
    res.status(200).json({ walletBalance: user.walletBalance });
  } catch (err) {
    console.error('Wallet fetch error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/deposit
// @desc    Simulate deposit
// @access  Private
router.post('/deposit', protect, async (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: 'Invalid amount' });
  }

  try {
    // Update wallet balance
    req.user.walletBalance += amount;
    await req.user.save();

    // Create transaction record
    const transaction = new Transaction({
      user: req.user._id,
      type: 'deposit',
      amount,
      status: 'completed',
      description: 'Wallet deposit',
    });
    await transaction.save();

    res.status(201).json({ message: 'Deposit successful', walletBalance: req.user.walletBalance });
  } catch (err) {
    console.error('Deposit error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/withdraw
// @desc    Simulate withdrawal
// @access  Private
router.post('/withdraw', protect, async (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: 'Invalid amount' });
  }

  if (req.user.walletBalance < amount) {
    return res.status(400).json({ message: 'Insufficient balance' });
  }

  try {
    req.user.walletBalance -= amount;
    await req.user.save();

    const transaction = new Transaction({
      user: req.user._id,
      type: 'withdrawal',
      amount,
      status: 'completed',
      description: 'Wallet withdrawal',
    });
    await transaction.save();

    res.status(201).json({ message: 'Withdrawal successful', walletBalance: req.user.walletBalance });
  } catch (err) {
    console.error('Withdrawal error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/transactions
// @desc    Get transaction history
// @access  Private
router.get('/transactions', protect, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(transactions);
  } catch (err) {
    console.error('Transaction fetch error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
