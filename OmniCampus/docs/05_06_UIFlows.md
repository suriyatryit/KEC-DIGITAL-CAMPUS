# OmniCampus Web Dashboard UI Layout

## Core Philosophy
- High information density for Admins & Leadership.
- Clean, accessible typography (Inter / Roboto).
- Sidebar navigation on the left, top bar for global search and profile.

## Page Layouts

### 1. Principal / Chairman Governance Dashboard (Home)
- **Top Row KPI Widgets**: 
  - Today's Overall Attendance % (Green/Yellow/Red indicator).
  - Active Grievances (SLA breached count in red).
  - Recent Notice Acknowledgment Rate.
- **Main Area - Split Layout**:
  - *Left 2/3*: "Campus Heatmap" - A grid showing attendance compliance by Department and Year.
  - *Right 1/3*: "AI Early Warning Flag" - A list of students predicted to drop out or fail based on combined metrics (attendance + engagement), with an "Explain" button.
- **Bottom Table**: Audit Log snippet showing recent critical actions (Overrides, Notice Edits).

### 2. Faculty Dashboard (Classes)
- **Grid View**: "My Classes" cards.
- **Clicking a Class (Inner Tab View)**:
  - Tab 1: **Stream**: announcements, post input box, latest student comments.
  - Tab 2: **Classwork**: Nested list of units > materials > assignments.
  - Tab 3: **People**: Data table of enrolled students, multi-select checkboxes for bulk action (e.g. "Message Students").
  - Tab 4: **Grades**: Matrix grid (rows: students, columns: assignments).

### 3. Communications Center (Push / Notices)
- **Compose Interface**: WYSIWYG editor. Toggle switches for "Emergency Override" and "Require Acknowledgment".
- **Targeting Selector**: Multi-select dropdowns for Dept, Batch, Roles.
- **Analytics View**: Stacked bar chart showing "Read", "Unread", "Acknowledged".

---
# OmniCampus Mobile UI Flow

## Core Philosophy
- Single App for both Student and Faculty (view changes based on logged-in role).
- Bottom Navigation Bar.
- Large tap targets, offline-sync indicator.

## Student Flow
1. **Login Screen**: Standard username/password + Biometrics fallback.
2. **Home Tab ("Today")**: 
   - Top banner: "Upcoming Class: CS401 in Room 2B (Starts in 10m)". Show rotating QR code if class requires digital scan.
   - Middle list: Unread Official Notices (Cards).
   - Bottom list: Due soon assignments.
3. **Classes Tab**: List of enrolled subjects. Tapping one goes into Stream/Classwork mobile views.
4. **Attendance Tab**: Calendar view showing red/green dots for present/absent. Summary % at the top.
5. **More Tab**: Feedback & Grievance form, Profile, Settings.

## Faculty Flow
1. **Home Tab**:
   - "Start Period" prompt for current timetable slot.
2. **Taking Attendance (Offline-first approach)**:
   - Tap "Start Session".
   - UI shows a big QR code (updates every 5s) for students to scan OR a list of students to manually toggle (Swipe right = Present, Swipe left = Absent).
   - "Finish & Sync" button at the bottom.
3. **Scanner Feature**: If reversing the flow (faculty scans student IDs), a full-screen camera view opens.
