const nodemailer = require('nodemailer');

// Mailer configuration
const transporter = nodemailer.createTransport({
  host: 'server.universalforex.asia', // SMTP server
  port: 25, // SMTP port
  secure: false, // SSL/TLS is not enabled
  auth: {
    user: 'noreply@trustfxlive.com', // Mailer username
    pass: 'Noreply@231$', // Mailer password
  },
  tls: {
    rejectUnauthorized: false, // Allow self-signed certificates
  },
  connectionTimeout: 1000, // Timeout in milliseconds
});

module.exports = transporter;
