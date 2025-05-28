const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    premiumTier: {
      type: String,
      enum: ['basic', 'silver', 'gold'],
      default: 'basic',
    },
    walletBalance: {
      type: Number,
      default: 0,
    },
    referralCode: {
      type: String,
      default: '',
    },
    referredBy: {
      type: String,
      default: '',
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
