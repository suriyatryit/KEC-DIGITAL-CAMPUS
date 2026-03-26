# KEC Backend API

Node.js + Express backend for Kingston Engineering College Management System.

## Setup

```bash
cd backend
npm install
npm run dev   # starts on http://localhost:5000
```

## API Reference

### Auth
| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| POST | `/api/auth/login` | Public | Login, returns JWT |
| GET | `/api/auth/me` | Any role | Get current user |

### Attendance
| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| POST | `/api/attendance/session/start` | Faculty/HOD | Start session — returns PIN + sessionId |
| PATCH | `/api/attendance/session/:id/pin` | Faculty/HOD | Regenerate PIN |
| DELETE | `/api/attendance/session/:id` | Faculty/HOD | End session |
| GET | `/api/attendance/session/active` | Student | List active sessions (no PIN) |
| POST | `/api/attendance/mark` | Student | Mark self present (PIN + GPS verified server-side) |
| GET | `/api/attendance/session/:id/records` | Faculty/HOD/Admin | Get session attendance |
| GET | `/api/attendance/my` | Student | Own attendance history |

### Users
| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| GET | `/api/users` | Chairman/Principal | List all users |
| GET | `/api/users/:id` | Self or admin | Get user by ID |

## Security
- All passwords hashed with bcrypt
- JWT tokens expire in 8h
- Attendance marking requires: valid PIN **+** within 100m of classroom GPS (verified server-side, not just client-side)
