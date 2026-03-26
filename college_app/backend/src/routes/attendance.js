const express = require('express');
const { authenticate, requireRole } = require('../middleware/auth');

const router = express.Router();

// In-memory session store: sessionId -> { pin, subject, facultyId, classroomLat, classroomLng, expiresAt }
const activeSessions = new Map();
// In-memory attendance records: [{ sessionId, studentId, rollNo, markedAt, lat, lng }]
const attendanceRecords = [];

const ALLOWED_RADIUS_METERS = 100;

// Haversine formula
function getDistanceMeters(lat1, lng1, lat2, lng2) {
  const R = 6371000;
  const toRad = (x) => (x * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ── Faculty: Start a session ──────────────────────────────────────────
// POST /api/attendance/session/start
router.post(
  '/session/start',
  authenticate,
  requireRole('faculty', 'hod'),
  (req, res) => {
    const { subject, classroomLat, classroomLng } = req.body;
    if (!subject || classroomLat == null || classroomLng == null)
      return res.status(400).json({ error: 'subject, classroomLat and classroomLng are required' });

    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    const sessionId = `ses_${Date.now()}`;
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    activeSessions.set(sessionId, {
      pin,
      subject,
      facultyId: req.user.id,
      facultyName: req.user.name,
      classroomLat: parseFloat(classroomLat),
      classroomLng: parseFloat(classroomLng),
      expiresAt,
    });

    res.json({ sessionId, pin, subject, expiresAt });
  }
);

// ── Faculty: Regenerate PIN ───────────────────────────────────────────
// PATCH /api/attendance/session/:sessionId/pin
router.patch(
  '/session/:sessionId/pin',
  authenticate,
  requireRole('faculty', 'hod'),
  (req, res) => {
    const session = activeSessions.get(req.params.sessionId);
    if (!session) return res.status(404).json({ error: 'Session not found' });
    if (session.facultyId !== req.user.id) return res.status(403).json({ error: 'Not your session' });

    session.pin = Math.floor(100000 + Math.random() * 900000).toString();
    session.expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    res.json({ pin: session.pin, expiresAt: session.expiresAt });
  }
);

// ── Faculty: End session ──────────────────────────────────────────────
// DELETE /api/attendance/session/:sessionId
router.delete(
  '/session/:sessionId',
  authenticate,
  requireRole('faculty', 'hod'),
  (req, res) => {
    const session = activeSessions.get(req.params.sessionId);
    if (!session) return res.status(404).json({ error: 'Session not found' });
    if (session.facultyId !== req.user.id) return res.status(403).json({ error: 'Not your session' });
    activeSessions.delete(req.params.sessionId);
    res.json({ message: 'Session ended' });
  }
);

// ── Student: Get active session info (no PIN exposed) ─────────────────
// GET /api/attendance/session/active
router.get('/session/active', authenticate, requireRole('student'), (req, res) => {
  const now = new Date();
  const sessions = [];
  for (const [id, s] of activeSessions) {
    if (s.expiresAt > now) {
      sessions.push({
        sessionId: id,
        subject: s.subject,
        facultyName: s.facultyName,
        expiresAt: s.expiresAt,
        classroomLat: s.classroomLat,
        classroomLng: s.classroomLng,
      });
    }
  }
  res.json(sessions);
});

// ── Student: Mark attendance (location + PIN verified server-side) ─────
// POST /api/attendance/mark
router.post('/mark', authenticate, requireRole('student'), (req, res) => {
  const { sessionId, pin, studentLat, studentLng } = req.body;

  if (!sessionId || !pin || studentLat == null || studentLng == null)
    return res.status(400).json({ error: 'sessionId, pin, studentLat and studentLng are required' });

  const session = activeSessions.get(sessionId);
  if (!session) return res.status(404).json({ error: 'Session not found or expired' });
  if (new Date() > session.expiresAt) {
    activeSessions.delete(sessionId);
    return res.status(410).json({ error: 'Session has expired' });
  }

  // 1. Verify PIN
  if (pin !== session.pin)
    return res.status(401).json({ error: 'Invalid PIN' });

  // 2. Verify location
  const dist = getDistanceMeters(
    parseFloat(studentLat), parseFloat(studentLng),
    session.classroomLat, session.classroomLng
  );
  if (dist > ALLOWED_RADIUS_METERS)
    return res.status(403).json({ error: `You are ${Math.round(dist)}m away. Must be within ${ALLOWED_RADIUS_METERS}m of the classroom.` });

  // 3. Check duplicate
  const alreadyMarked = attendanceRecords.some(
    (r) => r.sessionId === sessionId && r.studentId === req.user.id
  );
  if (alreadyMarked)
    return res.status(409).json({ error: 'Attendance already marked for this session' });

  // 4. Record
  attendanceRecords.push({
    sessionId,
    studentId: req.user.id,
    rollNo: req.user.rollNo,
    subject: session.subject,
    markedAt: new Date(),
    lat: parseFloat(studentLat),
    lng: parseFloat(studentLng),
  });

  res.json({ message: 'Attendance marked successfully', subject: session.subject });
});

// ── Faculty: Get attendance for a session ─────────────────────────────
// GET /api/attendance/session/:sessionId/records
router.get(
  '/session/:sessionId/records',
  authenticate,
  requireRole('faculty', 'hod', 'principal', 'chairman'),
  (req, res) => {
    const records = attendanceRecords.filter((r) => r.sessionId === req.params.sessionId);
    res.json(records);
  }
);

// ── Student: My attendance history ───────────────────────────────────
// GET /api/attendance/my
router.get('/my', authenticate, requireRole('student'), (req, res) => {
  const records = attendanceRecords.filter((r) => r.studentId === req.user.id);
  res.json(records);
});

module.exports = router;
