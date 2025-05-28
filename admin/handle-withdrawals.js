const mongoose = require('mongoose');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected for withdrawal processing'))
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

async function processWithdrawals() {
  try {
    const pendingWithdrawals = await Transaction.find({ type: 'withdrawal', status: 'pending' });

    if (pendingWithdrawals.length === 0) {
      console.log('No pending withdrawals to process.');
      return;
    }

    for (const tx of pendingWithdrawals) {
      const user = await User.findById(tx.user);

      if (!user) {
        console.warn(`User not found for transaction ID: ${tx._id}`);
        continue;
      }

      if (user.walletBalance < tx.amount) {
        console.warn(`Insufficient balance for user ${user.username} (ID: ${user._id}). Skipping transaction.`);
        continue;
      }

      // Deduct amount from user's wallet
      user.walletBalance -= tx.amount;
      await user.save();

      // Update transaction status to completed
      tx.status = 'completed';
      await tx.save();

      console.log(`Processed withdrawal of ₹${tx.amount} for user ${user.username} (ID: ${user._id}).`);
    }

    console.log('All pending withdrawals have been processed.');
  } catch (error) {
    console.error('Error processing withdrawals:', error);
  } finally {
    mongoose.connection.close();
  }
}

processWithdrawals();
