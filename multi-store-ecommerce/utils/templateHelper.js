// utils/templateHelper.js
const replacePlaceholders = (template, variables) => {
    let subject = template.subject;
    let body = template.body;
  
    Object.keys(variables).forEach((key) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      subject = subject.replace(regex, variables[key]);
      body = body.replace(regex, variables[key]);
    });
  
    return { subject, body };
  };
  
  module.exports = { replacePlaceholders };
  