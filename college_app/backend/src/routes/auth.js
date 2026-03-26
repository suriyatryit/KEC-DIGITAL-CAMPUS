const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findByUsername } = require('../data/users');

const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: 'Username and password are required' });

  const user = findByUsername(username);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  res.json({
    token,
    user: {
      id: user.id,
      username: user.name,
      role: user.role,
      department: user.department,
      rollNo: user.rollNo,
    },
  });
});

// GET /api/auth/me  — validate token & return user
router.get('/me', require('../middleware/auth').authenticate, (req, res) => {
  const { password, ...safeUser } = req.user;
  res.json(safeUser);
});

module.exports = router;
