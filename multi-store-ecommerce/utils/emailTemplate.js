const db = require('../config/db');

/**
 * Fetch email template and mailer configuration by purpose.
 * @param {string} templateName - The name of the template.
 * @param {Object} variables - Variables to replace in the template.
 * @returns {Object} - Template details and mailer configuration.
 */
const getEmailTemplateAndMailer = async (templateName, variables = {}) => {
  try {
    // Fetch the email template by name
    const [template] = await db.query(
      `SELECT * FROM EmailTemplates WHERE name = ? LIMIT 1`,
      [templateName]
    );

    if (!template.length) {
      throw new Error(`Email template "${templateName}" not found`);
    }

    const { subject, body, isHtml, purpose } = template[0];

    // Fetch the mailer configuration based on the purpose
    const [mailerConfig] = await db.query(
      `SELECT * FROM MailerConfig WHERE purpose = ? LIMIT 1`,
      [purpose]
    );

    if (!mailerConfig.length) {
      throw new Error(`Mailer configuration for purpose "${purpose}" not found`);
    }

    let processedSubject = subject;
    let processedBody = body;

    // Replace placeholders in the template
    for (const [key, value] of Object.entries(variables)) {
      processedSubject = processedSubject.replace(new RegExp(`{{${key}}}`, 'g'), value);
      processedBody = processedBody.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }

    return {
      subject: processedSubject,
      body: processedBody,
      isHtml,
      mailerConfig: mailerConfig[0], // Mailer configuration details
    };
  } catch (error) {
    console.error('Error fetching email template or mailer:', error.message);
    throw error;
  }
};

module.exports = getEmailTemplateAndMailer;
