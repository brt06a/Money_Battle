const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret';

exports.register = async (req, res) => {
  try {
    const { username, email, password, referralCode } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or Email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate referral code (optional logic)
    const userReferralCode = username + Math.floor(Math.random() * 10000);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      referralCode: userReferralCode,
      referredBy: referralCode || '',
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    // Find user by email or username
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const payload = {
      id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
      isPremium: user.isPremium,
      premiumTier: user.premiumTier,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isPremium: user.isPremium,
        premiumTier: user.premiumTier,
        walletBalance: user.walletBalance,
      },
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};
