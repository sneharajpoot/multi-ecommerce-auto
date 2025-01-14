/**
 * File: test/mailerService.test.js
 * Description:
 *   Unit test for the `mailerService` to verify email-sending functionality
 *   using different configurations (SMTP/AWS SES).
 */

const mailerService = require('../services/mailerService');

// Mock configuration for SMTP
const mockMailerConfig = {
  type: 'SMTP',
  smtpServer: 'smtp.example.com',
  smtpPort: 587,
  enableSSL: false,
  username: 'noreply@example.com',
  password: 'password',
  timeoutMs: 1000,
};

// Mock email data
const mockEmailData = {
  to: 'user@example.com',
  subject: 'Welcome to Our Platform!',
  body: '<p>Thank you for joining!</p>',
  isHtml: true,
};

// Jest Test Suite
describe('mailerService.sendMail', () => {
  it('should send an email successfully using SMTP', async () => {
    // Act & Assert
    await expect(mailerService.sendMail(mockMailerConfig, mockEmailData))
      .resolves
      .toBeDefined(); // Expect the function to resolve without errors
  });

  it('should throw an error for invalid SMTP configuration', async () => {
    // Invalid mailer configuration
    const invalidConfig = { ...mockMailerConfig, smtpServer: '' }; // Missing SMTP server

    // Act & Assert
    await expect(mailerService.sendMail(invalidConfig, mockEmailData))
      .rejects
      .toThrow('Invalid SMTP configuration'); // Adjust error message based on implementation
  });

  it('should throw an error for unsupported mailer type', async () => {
    // Unsupported mailer type
    const unsupportedConfig = { ...mockMailerConfig, type: 'Unsupported' };

    // Act & Assert
    await expect(mailerService.sendMail(unsupportedConfig, mockEmailData))
      .rejects
      .toThrow('Unsupported mailer type: Unsupported');
  });
});
