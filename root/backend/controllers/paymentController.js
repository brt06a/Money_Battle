const Transaction = require('../models/Transaction');
const User = require('../models/User');

// @desc    Get current wallet balance
// @route   GET /api/wallet
// @access  Private
exports.getWalletBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('walletBalance');
    res.status(200).json({ walletBalance: user.walletBalance });
  } catch (err) {
    console.error('Wallet fetch error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Deposit funds into wallet
// @route   POST /api/deposit
// @access  Private
exports.deposit = async (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: 'Invalid amount' });
  }

  try {
    req.user.walletBalance += amount;
    await req.user.save();

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
};

// @desc    Withdraw funds from wallet
// @route   POST /api/withdraw
// @access  Private
exports.withdraw = async (req, res) => {
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
};

// @desc    Get user's transaction history
// @route   GET /api/transactions
// @access  Private
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(transactions);
  } catch (err) {
    console.error('Transaction fetch error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
