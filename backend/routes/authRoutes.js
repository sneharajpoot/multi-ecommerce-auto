const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// ...existing code...

router.post('/decrypt-token', (req, res) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).send(decoded);
  } catch (error) {
    res.status(400).send({ message: 'Invalid token' });
  }
});

// ...existing code...

module.exports = router;
