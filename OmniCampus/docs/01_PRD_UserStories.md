# OmniCampus PRD & User Stories

## Product Overview
OmniCampus is a Unified College Operating System providing a cross-platform (Web + Mobile) suite that brings together attendance, classroom management, institution-wide communications, grievance redressal, and leadership monitoring dashboards.

## Key Features
1. **Attendance Marking**: Timetable-linked, offline-first, anti-fraud enabled marking by faculty. 
2. **Classroom Worflows**: Google Classroom-style stream, assignments, grading, people roster.
3. **Unified Communications**: Verified announcements, targeted broadcast, acknowledgement tracking.
4. **Feedback & Grievance**: SLA-driven ticketing, anonymous options.
5. **Leadership Dashboard**: Near real-time view of compliance, attendance heatmaps, early-warning AI.

## Roles & Permissions
- **Student**: View attendance, complete assignments, read/acknowledge notices, file grievances.
- **Faculty**: Record attendance, create classes/assignments, grade submissions, post class announcements.
- **HOD (Department Head)**: View department analytics, approve attendance corrections, HOD-level notices.
- **Principal**: Institution-wide dashboard, approve/override top level actions, Principal-level notices.
- **Chairman**: High-level governance, view all heatmaps & reports, audit logs.
- **Admin**: System configs, RBAC control, manual overrides.

## User Stories

### Faculty
- *As a Faculty*, I want to create a class so that I can manage my subject's students.
- *As a Faculty*, I want to open the mobile app and mark attendance offline when in class with weak network, so that it syncs later.
- *As a Faculty*, I need to enforce a rotating QR check-in on students' devices to prevent proxy attendance.
- *As a Faculty*, I want to post an assignment with a due date so students can submit their work.
- *As a Faculty*, I want to grade submissions quickly and return them with comments.

### Student
- *As a Student*, I want an overview of my upcoming assignments and my overall attendance percentage.
- *As a Student*, I need to be able to scan my teacher's QR code to mark myself present.
- *As a Student*, I want to anonymously submit a grievance about hostel food and track its status.

### Chairman / Principal
- *As a Chairman*, I want to open a dashboard and see today's attendance compliance across all departments.
- *As a Principal*, I want to send an emergency broadcast to all students that overrides quiet hours.

### Admin
- *As an Admin*, I want to import users and enrollments via CSV or REST API so onboarding is seamless.
