# OmniCampus Testing Strategy

## Overview
Given the critical nature of attendance and grading, a robust testing pyramid is required.

## Testing Layers
### 1. Unit Testing
- **Backend (NestJS/Jest)**: Test all core business logic services (e.g., `AttendanceService.markAttendance()`, `GrievanceService.escalateTicket()`) mapping exactly to the ERD business rules. Mock the database via Prisma/TypeORM mocks or in-memory SQLite.
- **Frontend (React/Jest/RTL)**: Test component rendering, specifically state transitions on the Attendance marking UI.
- **Mobile (Flutter)**: Test offline-to-online sync local storage state changes.

### 2. Integration Testing
- Supertest on NestJS controllers to hit an actual Postgres test container.
- Validate database transaction integrity on `POST /attendance/sessions/:id/mark`. Test rollback in case of partial fails.
- Validate JWT generation and validation across module boundaries.

### 3. End-to-End (E2E) Testing
- Use Playwright/Cypress for the Web app. Test the complete flow of creating a class -> assigning students -> posting material.
- Use Appium for the Flutter mobile app to test the QR scan flow and login.

## Sample Test (NestJS Unit Test for Attendance)
```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceService } from './attendance.service';

describe('AttendanceService', () => {
  let service: AttendanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttendanceService],
    }).compile();

    service = module.get<AttendanceService>(AttendanceService);
  });

  it('should throw Error if trying to mark attendance for a closed session', async () => {
    const session = { id: 'uuid-1', status: 'CLOSED' };
    await expect(service.markAttendance(session.id, [{ studentId: 'stu-1', status: 'PRESENT' }]))
      .rejects.toThrow('Session is already closed');
  });
});
```
