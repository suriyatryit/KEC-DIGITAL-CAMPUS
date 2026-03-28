# OmniCampus Threat Model & Security Checklist

## Threat Modeling (STRIDE)
- **Spoofing**: Actor impersonates Admin to gain DB access. *Mitigation*: Strong JWT (+ refresh tokens), MFA for Admins, Session Fingerprinting. Faculty marking proxy attendance: *Mitigation*: Rotating QR codes, location geofencing.
- **Tampering**: Modifying attendance records in transit. *Mitigation*: TLS 1.2+ for all API traffic, payload signing for offline syncs.
- **Repudiation**: "I didn't change that grade". *Mitigation*: Immutable Audit Logs linked directly to signed-in User ID.
- **Information Disclosure**: Endpoint exposes user PII. *Mitigation*: DTO validation, strip password hashes and strictly limit payload responses.
- **Denial of Service**: Overloading API with grievance attachments. *Mitigation*: Rate limiting per IP/User, S3 pre-signed URLs with size limits.
- **Elevation of Privilege**: Student assigning themselves as Faculty. *Mitigation*: strict RBAC guards (`@Roles(Role.FACULTY)` in NestJS) on every route.

## OWASP ASVS-style Checklist (Level 2: Standard/Critical apps)

### V2: Authentication
- [x] Verify all authentication paths use secure sessions (e.g., HttpOnly, Secure cookies or strict Bearer handling).
- [x] Verify password composition rules and robust brute-force protection (e.g., exponential backoff).
- [x] Implement MFA (Passkey/FIDO2 preferred) for all privileged accounts.

### V4: Access Control
- [x] Verify principle of least privilege is strictly enforced on all APIs.
- [x] Enforce contextual authorization (e.g., HOD of CS cannot approve attendance corrections for EE dept).

### V5: Validation, Sanitization and Encoding
- [x] Use `class-validator` to strictly validate all incoming JSON data against expected schema.
- [x] Parameterized SQL Queries globally (via ORM) to prevent SQLi.

### V7: Error Handling and Logging
- [x] Ensure production errors do not leak stack traces.
- [x] Log all security events (login, password change, permission grant) to the audit table securely.

### V8: Data Protection
- [x] TLS for data in transit; AES256 for data at rest (handled via AWS RDS / PostgreSQL config).
- [x] Mask/hash sensitive data (like the QR generation secrets) even in DB view.
