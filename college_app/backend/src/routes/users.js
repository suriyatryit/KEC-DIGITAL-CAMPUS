const express = require('express');
const { authenticate, requireRole } = require('../middleware/auth');
const { users } = require('../data/users');

const router = express.Router();

// GET /api/users  — list users (admin/principal only)
router.get('/', authenticate, requireRole('chairman', 'principal'), (req, res) => {
  res.json(users.map(({ password, ...u }) => u));
});

// GET /api/users/:id
router.get('/:id', authenticate, (req, res) => {
  const target = users.find(u => u.id === req.params.id);
  if (!target) return res.status(404).json({ error: 'User not found' });
  // Students/faculty can only view themselves
  if (!['chairman', 'principal', 'hod'].includes(req.user.role) && req.user.id !== req.params.id)
    return res.status(403).json({ error: 'Forbidden' });
  const { password, ...safeUser } = target;
  res.json(safeUser);
});

module.exports = router;
