const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', (req, res) => {
  db.all('SELECT * FROM Teachers', (err, rows) => {
    if (err) return res.status(500).send('Server error');
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const { name, subject, user_id } = req.body;
  db.run('INSERT INTO Teachers (name, subject, user_id) VALUES (?, ?, ?)', [name, subject, user_id], function (err) {
    if (err) return res.status(500).send('Server error');
    res.status(201).json({ teacher_id: this.lastID });
  });
});

module.exports = router;
