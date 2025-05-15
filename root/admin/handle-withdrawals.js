const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

const processWithdrawals = async () => {
  try {
    const pendingWithdrawals = await Transaction.find({ type: 'withdrawal', status: 'pending' });

    if (pendingWithdrawals.length === 0) {
      console.log('ℹ️ No pending withdrawals found.');
      return;
    }

    for (const tx of pendingWithdrawals) {
      const user = await User.findById(tx.user);

      if (!user) {
        console.warn(`⚠️ User not found for transaction ID: ${tx._id}`);
        continue;
      }

      if (user.walletBalance < tx.amount) {
        console.warn(`⚠️ Insufficient balance for user ${user.username} (ID: ${user._id}). Skipping transaction ID: ${tx._id}`);
        continue;
      }

      // Deduct amount from user's wallet
      user.walletBalance -= tx.amount;
      await user.save();

      // Update transaction status
      tx.status = 'completed';
      tx.description = 'Withdrawal processed by admin script';
      await tx.save();

      console.log(`✅ Processed withdrawal of ₹${tx.amount} for user ${user.username} (ID: ${user._id}). Transaction ID: ${tx._id}`);
    }
  } catch (err) {
    console.error('❌ Error processing withdrawals:', err.message);
  }
};

const run = async () => {
  await connectDB();
  await processWithdrawals();
  mongoose.disconnect();
};

run();
