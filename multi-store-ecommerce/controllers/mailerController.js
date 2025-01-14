const { replacePlaceholders } = require('../utils/templateHelper');
const db = require('../config/db'); // For fetching templates
const mailerService = require('../services/mailerService'); // Handles sending emails

const sendEmail = async (req, res) => {
  const { purpose, recipient, variables } = req.body;

  try {
    // Fetch the email template from the database
    const [template] = await db.query(
      'SELECT * FROM MailTemplates WHERE purpose = ? AND isActive = 1 LIMIT 1',
      [purpose]
    );

    if (!template.length) {
      return res.status(404).json({ error: 'Template not found' });
    }

    // Replace placeholders
    const emailContent = replacePlaceholders(template[0], variables);

    // Send the email using mailerService
    const result = await mailerService.sendMail({
      to: recipient,
      subject: emailContent.subject,
      html: emailContent.body,
    });

    return res.status(200).json({ message: 'Email sent successfully', result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
};

module.exports = { sendEmail };
