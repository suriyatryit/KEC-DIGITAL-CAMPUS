# OmniCampus Database Schema

## ERD Overview
The core entities are separated logically by domains:
- **Identity & Access**: `users`, `roles`, `permissions`, `departments`.
- **Academics**: `courses`, `classes`, `enrollments`.
- **Attendance**: `attendance_sessions`, `attendance_records`, `attendance_corrections`.
- **Classroom**: `posts`, `assignments`, `submissions`, `grades`.
- **Communications**: `notices`, `acknowledgements`.
- **Grievances**: `tickets`, `ticket_updates`.
- **Audit**: `audit_logs`.

## Key Tables

### `users`
- `id` (UUID, PK)
- `email` (VARCHAR, Unique)
- `password_hash` (VARCHAR)
- `first_name` (VARCHAR)
- `last_name` (VARCHAR)
- `role` (ENUM: STUDENT, FACULTY, HOD, PRINCIPAL, CHAIRMAN, ADMIN)
- `department_id` (UUID, FK -> departments.id)
- `created_at`, `updated_at`

### `classes` (Equivalent to a section/subject instance)
- `id` (UUID, PK)
- `name` (VARCHAR)
- `course_code` (VARCHAR)
- `faculty_id` (UUID, FK -> users.id)
- `department_id` (UUID, FK -> departments.id)
- `semester` (VARCHAR)

### `enrollments`
- `id` (UUID, PK)
- `class_id` (UUID, FK)
- `student_id` (UUID, FK)
- `status` (ENUM: ACTIVE, DROPPED)

### `attendance_sessions`
- `id` (UUID, PK)
- `class_id` (UUID, FK)
- `faculty_id` (UUID, FK)
- `date` (DATE)
- `period_number` (INT)
- `status` (ENUM: OPEN, CLOSED)
- `qr_secret` (VARCHAR) -- For rotating QR
- `location_lat`, `location_lng`

### `attendance_records`
- `id` (UUID, PK)
- `session_id` (UUID, FK)
- `student_id` (UUID, FK)
- `status` (ENUM: PRESENT, ABSENT, LATE, EXCUSED)
- `marked_by` (UUID, FK -> users.id) -- Student (if QR) or Faculty
- `device_integrity_score` (FLOAT)
- `synced_at` (TIMESTAMP)

### `audit_logs` (Immutable)
- `id` (UUID, PK)
- `actor_id` (UUID, FK)
- `action` (VARCHAR) -- e.g., 'ATTENDANCE_OVERRIDE'
- `entity_type` (VARCHAR)
- `entity_id` (VARCHAR)
- `old_value` (JSONB)
- `new_value` (JSONB)
- `ip_address` (VARCHAR)
- `created_at` (TIMESTAMP)

## Notes on Implementation
- Soft deletes on critical records (classes, users).
- `audit_logs` table must be partitioned by month and strictly append-only.
