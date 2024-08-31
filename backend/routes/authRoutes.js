const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/database');
const router = express.Router();

router.post('/:type', (req, res) => {
  const { username, password } = req.body;
  const { type } = req.params;

  db.get('SELECT * FROM Users WHERE username = ? AND role = ?', [username, type], (err, user) => {
    if (err) return res.status(500).send('Server error');
    if (!user) return res.status(401).send('Invalid credentials');

    bcrypt.compare(password, user.password, (err, match) => {
      if (err) return res.status(500).send('Server error');
      if (!match) return res.status(401).send('Invalid credentials');

      const token = jwt.sign({ id: user.user_id, role: user.role }, process.env.JWT_SECRET);
      res.json({ token });
    });
  });
});

module.exports = router;
