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

/**
 * @swagger
 * /mailer-config:
 *   post:
 *     summary: Add a new mailer configuration
 *     tags: [Mailer Config]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the mailer configuration
 *               type:
 *                 type: string
 *                 description: The type of the mailer configuration (SMTP or AWS)
 *               smtpServer:
 *                 type: string
 *                 description: The SMTP server address
 *               smtpPort:
 *                 type: integer
 *                 description: The SMTP server port
 *               username:
 *                 type: string
 *                 description: The username for the mailer configuration
 *               password:
 *                 type: string
 *                 description: The password for the mailer configuration
 *               awsAccessKey:
 *                 type: string
 *                 description: The AWS access key
 *               awsSecretKey:
 *                 type: string
 *                 description: The AWS secret key
 *               awsRegion:
 *                 type: string
 *                 description: The AWS region
 *               enableSSL:
 *                 type: boolean
 *                 description: Whether to enable SSL
 *               timeoutMs:
 *                 type: integer
 *                 description: The timeout in milliseconds
 *               purpose:
 *                 type: string
 *                 description: The purpose of the mailer configuration
 *     responses:
 *       201:
 *         description: Mailer configuration added successfully
 *       500:
 *         description: Internal server error
 */
router.post('/mailer-config', validateRequest(mailerConfigValidation), async (req, res) => {
  try {
    const result = await addMailerConfig(req.body);
    res.status(201).json({ message: 'Mailer configuration added successfully', ...result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /mailer-config/{id}:
 *   put:
 *     summary: Update an existing mailer configuration
 *     tags: [Mailer Config]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the mailer configuration to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the mailer configuration
 *               type:
 *                 type: string
 *                 description: The type of the mailer configuration (SMTP or AWS)
 *               smtpServer:
 *                 type: string
 *                 description: The SMTP server address
 *               smtpPort:
 *                 type: integer
 *                 description: The SMTP server port
 *               username:
 *                 type: string
 *                 description: The username for the mailer configuration
 *               password:
 *                 type: string
 *                 description: The password for the mailer configuration
 *               awsAccessKey:
 *                 type: string
 *                 description: The AWS access key
 *               awsSecretKey:
 *                 type: string
 *                 description: The AWS secret key
 *               awsRegion:
 *                 type: string
 *                 description: The AWS region
 *               enableSSL:
 *                 type: boolean
 *                 description: Whether to enable SSL
 *               timeoutMs:
 *                 type: integer
 *                 description: The timeout in milliseconds
 *               purpose:
 *                 type: string
 *                 description: The purpose of the mailer configuration
 *     responses:
 *       200:
 *         description: Mailer configuration updated successfully
 *       500:
 *         description: Internal server error
 */
router.put('/mailer-config/:id', validateRequest(mailerConfigValidation), async (req, res) => {
  try {
    await updateMailerConfig(req.params.id, req.body);
    res.status(200).json({ message: 'Mailer configuration updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /mailer-config/{id}:
 *   delete:
 *     summary: Delete a mailer configuration
 *     tags: [Mailer Config]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the mailer configuration to delete
 *     responses:
 *       200:
 *         description: Mailer configuration deleted successfully
 *       500:
 *         description: Internal server error
 */
router.delete('/mailer-config/:id', async (req, res) => {
  try {
    await deleteMailerConfig(req.params.id);
    res.status(200).json({ message: 'Mailer configuration deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
