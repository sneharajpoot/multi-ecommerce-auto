/**
 * File: utils/sendEmail.js
 * Description: Utility to send emails using dynamic templates and configurable mailer settings.
 */

const nodemailer = require('nodemailer');
const AWS = require('aws-sdk');
const getEmailTemplateAndMailer = require('./emailTemplate');
const { replacePlaceholders } = require('./templateHelper');

/**
 * Send an email using the specified template and mailer configuration.
 * @param {string} to - Recipient's email address.
 * @param {string} templateName - Name of the email template.
 * @param {Object} variables - Variables to replace in the template.
 */
const sendEmailWithTemplate = async (to, templateName, variables = {}) => {
  try {
    // Fetch the email template and associated mailer configuration
    const { subject, body, isHtml, mailerConfig } = await getEmailTemplateAndMailer(templateName, variables);

    // Replace placeholders in the email content
    const emailContent = replacePlaceholders({ subject, body }, variables);

    if (mailerConfig.type === 'SMTP') {
      const transporter = nodemailer.createTransport({
        host: mailerConfig.smtpServer,
        port: mailerConfig.smtpPort,
        secure: mailerConfig.enableSSL,
        auth: {
          user: mailerConfig.username,
          pass: mailerConfig.password,
        },
        tls: {
          rejectUnauthorized: !mailerConfig.enableSSL,
        },
        connectionTimeout: mailerConfig.timeoutMs,
      });

      const mailOptions = {
        from: mailerConfig.username,
        to,
        subject: emailContent.subject,
        text: isHtml ? '' : emailContent.body,
        html: isHtml ? emailContent.body : '',
      };

      await transporter.sendMail(mailOptions);
      console.log(`SMTP: Email sent to ${to}`);
    } else if (mailerConfig.type === 'AWS') {
      AWS.config.update({
        accessKeyId: mailerConfig.awsAccessKey,
        secretAccessKey: mailerConfig.awsSecretKey,
        region: mailerConfig.awsRegion,
      });

      const ses = new AWS.SES();
      const params = {
        Destination: { ToAddresses: [to] },
        Message: {
          Body: {
            Html: { Data: emailContent.body },
            Text: { Data: emailContent.body },
          },
          Subject: { Data: emailContent.subject },
        },
        Source: mailerConfig.username,
      };

      await ses.sendEmail(params).promise();
      console.log(`AWS SES: Email sent to ${to}`);
    } else {
      throw new Error(`Unsupported mailer type: ${mailerConfig.type}`);
    }
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw error;
  }
};

module.exports = sendEmailWithTemplate;
