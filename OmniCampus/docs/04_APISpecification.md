# OmniCampus API Specification (Highlights)

This is an abbreviated OpenAPI-style specification for the core MVP workflows.

## Authentication
`POST /api/v1/auth/login`
- Body: `{ "email": "admin@college.edu", "password": "..." }`
- Response: 200 OK `{ "accessToken": "jwt...", "role": "ADMIN" }`

## Classes Application
`POST /api/v1/classes`
- Headers: `Authorization: Bearer <token>`
- Body: `{ "name": "Computer Networks", "courseCode": "CS401", "departmentId": "uuid" }`
- Response: 201 Created `{ "id": "uuid", "name": "Computer Networks" }`

`POST /api/v1/classes/{classId}/enroll`
- Body: `{ "studentIds": ["uuid1", "uuid2"] }`
- Response: 200 OK

## Attendance
`POST /api/v1/attendance/sessions`
- Body: `{ "classId": "uuid", "date": "2026-03-23", "periodNumber": 1 }`
- Response: 201 Created `{ "sessionId": "uuid", "qrSecret": "..." }`

`POST /api/v1/attendance/sessions/{sessionId}/mark`
- Body: 
```json
{
  "records": [
    { "studentId": "uuid1", "status": "PRESENT" },
    { "studentId": "uuid2", "status": "ABSENT" }
  ],
  "offlineSync": false,
  "clientTimestamp": "2026-03-23T10:00:00Z"
}
```
- Response: 200 OK

`POST /api/v1/attendance/corrections`
- Body: `{ "recordId": "uuid", "newStatus": "PRESENT", "reason": "Student late due to bus" }`
- Response: 202 Accepted (Triggers workflow for HOD override)

## Communication
`POST /api/v1/communication/notices`
- Body: `{ "title": "Exam Schedule", "content": "Attached...", "targetDepartments": ["uuid"], "requiresAck": true }`
- Response: 201 Created

`GET /api/v1/communication/notices/{noticeId}/compliance`
- Response: 200 OK `{ "totalTargets": 500, "acknowledged": 450, "pending": 50 }`
