const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto'); 
const sendEmail = require('../../utils/sendEmail'); 
const { Op } = require('sequelize'); 

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// 1. REGISTER
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    const userExists = await User.findOne({ where: { email } });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ firstName, lastName, email, password: hashedPassword, role: role || 'student' });
    res.status(201).json({ _id: user.id, name: `${user.firstName} ${user.lastName}`, email: user.email, token: generateToken(user.id), role: user.role, isOnboarded: false });
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

// 2. LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({ _id: user.id, name: `${user.firstName} ${user.lastName}`, email: user.email, token: generateToken(user.id), role: user.role, isOnboarded: user.isOnboarded });
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

// 3. FORGOT PASSWORD
const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate Token
    const resetToken = crypto.randomBytes(20).toString('hex');
    
    // ✅ FIX: Added 's' to resetPasswordExpires to match your DB
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 Minutes
    
    await user.save();

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
    const message = `
      <h1>Password Reset Request</h1>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}" clicktracking=off>${resetUrl}</a>
    `;

    try {
      await sendEmail({ email: user.email, subject: 'Password Reset', message });
      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (err) {
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null; // ✅ FIX: Added 's'
      await user.save();
      return res.status(500).json({ message: "Email failed to send" });
    }
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Server Error" }); 
  }
};

// 4. RESET PASSWORD
const resetPassword = async (req, res) => {
  console.log("🔄 Reset Password Attempt...");
  try {
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.resetToken)
        .digest('hex');

    // ✅ FIX: Changed resetPasswordExpire -> resetPasswordExpires (with 's')
    const user = await User.findOne({
      where: { 
        resetPasswordToken, 
        resetPasswordExpires: { [Op.gt]: Date.now() } 
      }
    });

    if (!user) {
        return res.status(400).json({ message: "Invalid or Expired Token" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    
    // ✅ FIX: Added 's' to match DB
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    
    await user.save();

    res.status(200).json({ success: true, data: "Password Updated" });

  } catch (error) { 
    console.error("❌ Reset Password Error:", error);
    res.status(500).json({ message: "Server Error" }); 
  }
};

// 5. GOOGLE CALLBACK
const googleCallback = (req, res) => {
    const token = generateToken(req.user.id);
    const target = req.user.isOnboarded ? '/dashboard' : '/onboarding';
    res.redirect(`http://localhost:5173${target}?token=${token}`);
};

module.exports = { registerUser, loginUser, forgotPassword, resetPassword, googleCallback };