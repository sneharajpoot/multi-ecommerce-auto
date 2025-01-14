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

// Add EmailTemplate
router.post('/email-template', validateRequest(emailTemplateValidation), async (req, res) => {
  try {
    const result = await addEmailTemplate(req.body);
    res.status(201).json({ message: 'Email template added successfully', ...result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update EmailTemplate
router.put('/email-template/:id', validateRequest(emailTemplateValidation), async (req, res) => {
  try {
    await updateEmailTemplate(req.params.id, req.body);
    res.status(200).json({ message: 'Email template updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete EmailTemplate
router.delete('/email-template/:id', async (req, res) => {
  try {
    await deleteEmailTemplate(req.params.id);
    res.status(200).json({ message: 'Email template deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
