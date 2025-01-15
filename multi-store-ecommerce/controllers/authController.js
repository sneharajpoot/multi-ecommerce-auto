const bcrypt = require('bcrypt');
const jwt = require('../utils/jwtHelper');
const db = require('../models'); // Correct path to models
const { Users } = db;

// bcrypt.hash('Asd@1212', 10).then((hash) => {
//   console.log('---->', hash)
// })
console.log('---->', )
/**
 * Register a store owner.
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
exports.registerStoreOwner = async (req, res) => {
  const { name, email, password, storeName, currency, timezone } = req.body;

  const transaction = await db.sequelize.transaction(); // Use transactions for atomic operations

  try {
    // Check if email already exists
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const [userResult] = await db.sequelize.query(
      `
      INSERT INTO Users (uuid, name, email, password, role)
      VALUES (UUID(), ?, ?, ?, ?)
      `,
      {
        replacements: [name, email, hashedPassword, 'store_admin'], // Default role: Store Admin
        type: db.Sequelize.QueryTypes.INSERT,
      }
    );

    const userId = userResult; // Last inserted user ID
    return res.status(201).json({ userId, name, email });
  } catch (error) {
    // Rollback the transaction in case of error
    await transaction.rollback();
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Register a customer.
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
exports.registerCustomer = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if email already exists
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const [userResult] = await db.sequelize.query(
      `
      INSERT INTO Users (uuid, name, email, password, role)
      VALUES (UUID(), ?, ?, ?, ?)
      `,
      {
        replacements: [name, email, hashedPassword, 'customer'], // Default role: Customer
        type: db.Sequelize.QueryTypes.INSERT,
      }
    );

    const userId = userResult; // Last inserted user ID
    return res.status(201).json({ userId, name, email });
  } catch (error) {
    console.error('Error registering customer:', error.message);
    return res.status(500).json({ error: 'Failed to register customer' });
  }
};

// User Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }
    const token = jwt.generateRefreshToken({ id: user.id, role: user.role } , '1d' );
    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Refresh Token
exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: 'Refresh token is required' });
  }

  try {
    const payload = jwt.verifyRefreshToken(refreshToken);
    const newAccessToken = jwt.generateToken({ id: payload.id, roleId: payload.roleId });

    return res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Logout
exports.logout = (req, res) => {
  try {
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Change Password
exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const [user] = await db.query(`SELECT * FROM Users WHERE id = ?`, [req.user.id]);
    if (!user.length) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordMatch = await bcrypt.compare(oldPassword, user[0].password);
    if (!isPasswordMatch) {
      return res.status(400).json({ error: 'Old password is incorrect' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.query(`UPDATE Users SET password = ? WHERE id = ?`, [hashedPassword, req.user.id]);

    return res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const [user] = await db.query(`SELECT * FROM Users WHERE email = ?`, [email]);
    if (!user.length) {
      return res.status(404).json({ error: 'User not found' });
    }

    const resetToken = jwt.generateToken({ id: user[0].id, roleId: user[0].roleId }, '15m');

    // Here you can integrate your email sender logic
    // Example: sendResetPasswordEmail(user[0].email, resetToken);

    return res.status(200).json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;

  try {
    const payload = jwt.verifyToken(resetToken);

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.query(`UPDATE Users SET password = ? WHERE id = ?`, [hashedPassword, payload.id]);

    return res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    return res.status(400).json({ error: 'Invalid or expired reset token' });
  }
};
