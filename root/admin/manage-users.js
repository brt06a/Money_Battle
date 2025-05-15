const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

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

const listUsers = async () => {
  try {
    const users = await User.find().select('-password');
    console.log('📋 User List:');
    users.forEach((user, index) => {
      console.log(`${index + 1}. ID: ${user._id}, Username: ${user.username}, Email: ${user
