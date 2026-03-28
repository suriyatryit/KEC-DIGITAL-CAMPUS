'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'STUDENT' | 'FACULTY' | 'HOD' | 'PRINCIPAL' | 'CHAIRMAN' | 'ADMIN';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  loginAs: (role: UserRole) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const mockUsers: Record<UserRole, UserProfile> = {
  CHAIRMAN: { id: 'usr_chair_1', name: 'Dr. Arthur Pendelton', email: 'chairman@nexus.edu', role: 'CHAIRMAN' },
  PRINCIPAL: { id: 'usr_princ_1', name: 'Dr. Sarah Jenkins', email: 'principal@nexus.edu', role: 'PRINCIPAL' },
  HOD: { id: 'usr_hod_cs', name: 'Prof. Alan Turing', email: 'hod.cs@nexus.edu', role: 'HOD', department: 'Computer Science' },
  FACULTY: { id: 'usr_fac_1', name: 'Dr. Emily Chen', email: 'emily.chen@nexus.edu', role: 'FACULTY', department: 'Computer Science' },
  STUDENT: { id: 'usr_stu_1', name: 'Alex Harper', email: 'alex.h@nexus.edu', role: 'STUDENT', department: 'Computer Science' },
  ADMIN: { id: 'usr_adm_1', name: 'System Admin', email: 'admin@nexus.edu', role: 'ADMIN' },
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for persistent demo login
    const savedUser = localStorage.getItem('nexus_demo_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const loginAs = async (role: UserRole) => {
    setIsLoading(true);
    // Simulate network delay for realistic feel
    await new Promise((resolve) => setTimeout(resolve, 800));
    const profile = mockUsers[role];
    setUser(profile);
    localStorage.setItem('nexus_demo_user', JSON.stringify(profile));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nexus_demo_user');
  };

  return (
    <AuthContext.Provider value={{ user, loginAs, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
