/**
 * File: services/mailerService.js
 * Description: Service for sending emails using various providers like SMTP or AWS SES.
 */

const nodemailer = require('nodemailer');
const AWS = require('aws-sdk');

/**
 * Send an email using SMTP.
 * @param {Object} config - SMTP configuration.
 * @param {Object} emailData - Email details (to, subject, body).
 */
const sendSMTPMail = async (config, emailData) => {
  const transporter = nodemailer.createTransport({
    host: config.smtpServer,
    port: config.smtpPort,
    secure: config.enableSSL,
    auth: {
      user: config.username,
      pass: config.password,
    },
    tls: {
      rejectUnauthorized: !config.enableSSL,
    },
    connectionTimeout: config.timeoutMs,
  });

  const mailOptions = {
    from: config.username,
    to: emailData.to,
    subject: emailData.subject,
    text: emailData.isHtml ? '' : emailData.body,
    html: emailData.isHtml ? emailData.body : '',
  };

  return transporter.sendMail(mailOptions);
};

/**
 * Send an email using AWS SES.
 * @param {Object} config - AWS SES configuration.
 * @param {Object} emailData - Email details (to, subject, body).
 */
const sendSESMail = async (config, emailData) => {
  AWS.config.update({
    accessKeyId: config.awsAccessKey,
    secretAccessKey: config.awsSecretKey,
    region: config.awsRegion,
  });

  const ses = new AWS.SES();
  const params = {
    Destination: { ToAddresses: [emailData.to] },
    Message: {
      Body: {
        Html: { Data: emailData.body },
        Text: { Data: emailData.body },
      },
      Subject: { Data: emailData.subject },
    },
    Source: config.username,
  };

  return ses.sendEmail(params).promise();
};

/**
 * Service to send an email based on the mailer configuration.
 * @param {Object} mailerConfig - Mailer configuration (SMTP or AWS SES).
 * @param {Object} emailData - Email details (to, subject, body).
 */
const sendMail = async (mailerConfig, emailData) => {
  try {
    if (mailerConfig.type === 'SMTP') {
      return await sendSMTPMail(mailerConfig, emailData);
    } else if (mailerConfig.type === 'AWS') {
      return await sendSESMail(mailerConfig, emailData);
    } else {
      throw new Error(`Unsupported mailer type: ${mailerConfig.type}`);
    }
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw error;
  }
};

module.exports = { sendMail };
