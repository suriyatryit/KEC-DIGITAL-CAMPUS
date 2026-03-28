import { mockUsers, UserRole } from '../src/lib/auth/AuthContext';

describe('RBAC Definitions', () => {
  it('should export all required roles', () => {
    const roles: UserRole[] = ['STUDENT', 'FACULTY', 'HOD', 'PRINCIPAL', 'CHAIRMAN', 'ADMIN'];
    roles.forEach(role => {
      expect(mockUsers[role]).toBeDefined();
      expect(mockUsers[role].role).toBe(role);
    });
  });

  it('should correctly configure department access', () => {
    expect(mockUsers['HOD'].department).toBe('Computer Science');
    expect(mockUsers['FACULTY'].department).toBe('Computer Science');
    expect(mockUsers['CHAIRMAN'].department).toBeUndefined();
  });
});
