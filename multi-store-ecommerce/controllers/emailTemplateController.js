const db = require('../config/db');

// Add EmailTemplate
exports.addEmailTemplate = async (data) => {
  const { name, purpose, subject, body, isHtml } = data;

  const [result] = await db.query(
    `INSERT INTO EmailTemplates (name, purpose, subject, body, isHtml)
     VALUES (?, ?, ?, ?, ?)`,
    [name, purpose, subject, body, isHtml]
  );

  return { id: result.insertId };
};

// Update EmailTemplate
exports.updateEmailTemplate = async (id, data) => {
  const { name, purpose, subject, body, isHtml } = data;

  const [result] = await db.query(
    `UPDATE EmailTemplates 
     SET name = ?, purpose = ?, subject = ?, body = ?, isHtml = ?
     WHERE id = ?`,
    [name, purpose, subject, body, isHtml, id]
  );

  if (result.affectedRows === 0) {
    throw new Error('Email template not found');
  }
};

// Delete EmailTemplate
exports.deleteEmailTemplate = async (id) => {
  const [result] = await db.query(`DELETE FROM EmailTemplates WHERE id = ?`, [id]);

  if (result.affectedRows === 0) {
    throw new Error('Email template not found');
  }
};
