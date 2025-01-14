const validateRequest = (schema) => {
  return (req, res, next) => {
    // Implement validation logic based on the schema
    const errors = []; // Collect validation errors
    for (const [key, rule] of Object.entries(schema)) {
      if (!req.body[key]) {
        errors.push(`${key} is required`);
      }
      // Add more validation rules as needed
    }
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    next();
  };
};

module.exports = validateRequest;
