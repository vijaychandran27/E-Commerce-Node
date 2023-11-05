const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();


const secretKey = process.env.secretKey || 'your-secret-key';

router.post('/login', passport.authenticate('local'), (req, res) => {
  const user = req.body;
  const token = jwt.sign({ userId: user.id, username: user.username, role: user.role }, secretKey, { expiresIn: '1h' });

  res.json({ message: 'Login successful', token });
});

module.exports = router;
