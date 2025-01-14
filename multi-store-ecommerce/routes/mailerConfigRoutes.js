const express = require('express');
const router = express.Router();
const { addMailerConfig, updateMailerConfig, deleteMailerConfig } = require('../controllers/mailerConfigController');
const validateRequest = require('../utils/validationMiddleware');

// Validation schema for MailerConfig
const mailerConfigValidation = {
  name: 'required|string',
  type: 'required|string|in:SMTP,AWS',
  smtpServer: 'string',
  smtpPort: 'integer',
  username: 'string',
  password: 'string',
  awsAccessKey: 'string',
  awsSecretKey: 'string',
  awsRegion: 'string',
  enableSSL: 'boolean',
  timeoutMs: 'integer',
  purpose: 'required|string|in:Welcome,ForgotPassword,OrderConfirmation,Promotion',
};

// Add MailerConfig
router.post('/mailer-config', validateRequest(mailerConfigValidation), async (req, res) => {
  try {
    const result = await addMailerConfig(req.body);
    res.status(201).json({ message: 'Mailer configuration added successfully', ...result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update MailerConfig
router.put('/mailer-config/:id', validateRequest(mailerConfigValidation), async (req, res) => {
  try {
    await updateMailerConfig(req.params.id, req.body);
    res.status(200).json({ message: 'Mailer configuration updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete MailerConfig
router.delete('/mailer-config/:id', async (req, res) => {
  try {
    await deleteMailerConfig(req.params.id);
    res.status(200).json({ message: 'Mailer configuration deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
