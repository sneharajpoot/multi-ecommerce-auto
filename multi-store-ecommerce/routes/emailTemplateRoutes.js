const express = require('express');
const router = express.Router();
const { addEmailTemplate, updateEmailTemplate, deleteEmailTemplate } = require('../controllers/emailTemplateController');
const validateRequest = require('../utils/validationMiddleware');

// Validation schema for EmailTemplate
const emailTemplateValidation = {
  name: 'required|string',
  purpose: 'required|string|in:Welcome,ForgotPassword,OrderConfirmation,Promotion',
  subject: 'required|string',
  body: 'required|string',
  isHtml: 'boolean',
};

/**
 * @swagger
 * /email-template:
 *   post:
 *     summary: Add a new email template
 *     tags: [Email Template]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the email template
 *               purpose:
 *                 type: string
 *                 description: The purpose of the email template
 *               subject:
 *                 type: string
 *                 description: The subject of the email template
 *               body:
 *                 type: string
 *                 description: The body of the email template
 *               isHtml:
 *                 type: boolean
 *                 description: Whether the email template is in HTML format
 *     responses:
 *       201:
 *         description: Email template added successfully
 *       500:
 *         description: Internal server error
 */
router.post('/email-template', validateRequest(emailTemplateValidation), async (req, res) => {
  try {
    const result = await addEmailTemplate(req.body);
    res.status(201).json({ message: 'Email template added successfully', ...result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /email-template/{id}:
 *   put:
 *     summary: Update an existing email template
 *     tags: [Email Template]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the email template to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the email template
 *               purpose:
 *                 type: string
 *                 description: The purpose of the email template
 *               subject:
 *                 type: string
 *                 description: The subject of the email template
 *               body:
 *                 type: string
 *                 description: The body of the email template
 *               isHtml:
 *                 type: boolean
 *                 description: Whether the email template is in HTML format
 *     responses:
 *       200:
 *         description: Email template updated successfully
 *       500:
 *         description: Internal server error
 */
router.put('/email-template/:id', validateRequest(emailTemplateValidation), async (req, res) => {
  try {
    await updateEmailTemplate(req.params.id, req.body);
    res.status(200).json({ message: 'Email template updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /email-template/{id}:
 *   delete:
 *     summary: Delete an email template
 *     tags: [Email Template]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the email template to delete
 *     responses:
 *       200:
 *         description: Email template deleted successfully
 *       500:
 *         description: Internal server error
 */
router.delete('/email-template/:id', async (req, res) => {
  try {
    await deleteEmailTemplate(req.params.id);
    res.status(200).json({ message: 'Email template deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
