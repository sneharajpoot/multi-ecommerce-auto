const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middlewares/authMiddleware');
const validateRequest = require('../utils/validationMiddleware');

// Validation schemas
const registerValidation = {
  name: 'required|string',
  email: 'required|string',
  password: 'required|string|min:6',
  roleId: 'required|integer',
};

const loginValidation = {
  email: 'required|string',
  password: 'required|string',
};

const refreshTokenValidation = {
  refreshToken: 'required|string',
};

const changePasswordValidation = {
  oldPassword: 'required|string',
  newPassword: 'required|string|min:6',
};

const forgotPasswordValidation = {
  email: 'required|string',
};

const resetPasswordValidation = {
  resetToken: 'required|string',
  newPassword: 'required|string|min:6',
};

// Routes
router.post('/register', validateRequest(registerValidation), authController.registerStoreOwner);
router.post('/register-store-owner', authController.registerStoreOwner);
router.post('/register-customer', authController.registerCustomer);
router.post('/login', validateRequest(loginValidation), authController.login);
router.post('/refresh-token', validateRequest(refreshTokenValidation), authController.refreshToken);
router.post('/logout', authController.logout);
router.put('/change-password', authenticate, validateRequest(changePasswordValidation), authController.changePassword);
router.post('/forgot-password', validateRequest(forgotPasswordValidation), authController.forgotPassword);
router.post('/reset-password', validateRequest(resetPasswordValidation), authController.resetPassword);

module.exports = router;

