require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRouter = require('./routes/auth');
const attendanceRouter = require('./routes/attendance');
const usersRouter = require('./routes/users');

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'OK', server: 'KEC Backend v1.0' }));

app.use('/api/auth', authRouter);
app.use('/api/attendance', attendanceRouter);
app.use('/api/users', usersRouter);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`KEC Backend running on http://localhost:${PORT}`));
