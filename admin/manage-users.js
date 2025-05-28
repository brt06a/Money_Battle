const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../models/User');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected (manage-users.js)'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Display All Users
async function listAllUsers() {
  try {
    const users = await User.find({});
    console.log('===== Registered Users =====');
    users.forEach(user => {
      console.log(`ID: ${user._id}`);
      console.log(`Username: ${user.username}`);
      console.log(`Email: ${user.email}`);
      console.log(`Active: ${user.isActive}`);
      console.log(`Role: ${user.role}`);
      console.log(`Wallet Balance: ₹${user.walletBalance}`);
      console.log('-------------------------');
    });
  } catch (error) {
    console.error('Error listing users:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Activate or Deactivate a User
async function setUserActiveStatus(userId, status) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      console.error('User not found.');
      return;
    }
    user.isActive = status;
    await user.save();
    console.log(`User ${user.username} status updated to ${status ? 'active' : 'inactive'}.`);
  } catch (error) {
    console.error('Error updating user status:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Change User Role
async function changeUserRole(userId, newRole) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      console.error('User not found.');
      return;
    }
    user.role = newRole;
    await user.save();
    console.log(`User ${user.username} role changed to ${newRole}.`);
  } catch (error) {
    console.error('Error changing user role:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Example usage:
// listAllUsers();
// setUserActiveStatus('USER_ID_HERE', true);
// changeUserRole('USER_ID_HERE', 'admin');

// Uncomment the function you want to run
listAllUsers();
// setUserActiveStatus('65f2a9c4...exampleUserId', false);
// changeUserRole('65f2a9c4...exampleUserId', 'user');
