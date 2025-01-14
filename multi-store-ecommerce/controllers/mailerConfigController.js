const db = require('../config/db');

// Add MailerConfig
exports.addMailerConfig = async (data) => {
  const { name, type, smtpServer, smtpPort, username, password, awsAccessKey, awsSecretKey, awsRegion, enableSSL, timeoutMs, purpose } = data;

  const [result] = await db.query(
    `INSERT INTO MailerConfig (name, type, smtpServer, smtpPort, username, password, awsAccessKey, awsSecretKey, awsRegion, enableSSL, timeoutMs, purpose)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, type, smtpServer, smtpPort, username, password, awsAccessKey, awsSecretKey, awsRegion, enableSSL, timeoutMs, purpose]
  );

  return { id: result.insertId };
};

// Update MailerConfig
exports.updateMailerConfig = async (id, data) => {
  const { name, type, smtpServer, smtpPort, username, password, awsAccessKey, awsSecretKey, awsRegion, enableSSL, timeoutMs, purpose } = data;

  const [result] = await db.query(
    `UPDATE MailerConfig 
     SET name = ?, type = ?, smtpServer = ?, smtpPort = ?, username = ?, password = ?, awsAccessKey = ?, awsSecretKey = ?, awsRegion = ?, enableSSL = ?, timeoutMs = ?, purpose = ?
     WHERE id = ?`,
    [name, type, smtpServer, smtpPort, username, password, awsAccessKey, awsSecretKey, awsRegion, enableSSL, timeoutMs, purpose, id]
  );

  if (result.affectedRows === 0) {
    throw new Error('Mailer configuration not found');
  }
};

// Delete MailerConfig
exports.deleteMailerConfig = async (id) => {
  const [result] = await db.query(`DELETE FROM MailerConfig WHERE id = ?`, [id]);

  if (result.affectedRows === 0) {
    throw new Error('Mailer configuration not found');
  }
};
