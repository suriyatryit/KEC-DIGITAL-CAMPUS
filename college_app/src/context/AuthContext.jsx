import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ROLES } from '../utils/roles';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (session) => {
    if (!session) return null;
    
    // Attempt to fetch profile from the database
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (error) {
       console.log('Profile not found, auto-creating from metadata...');
       const newProfile = {
         id: session.user.id,
         name: session.user.user_metadata?.name || 'New User',
         role: session.user.user_metadata?.role || ROLES.STUDENT
       };

       // One-time upsert to stabilize the account
       const { data: created, error: createError } = await supabase
         .from('profiles')
         .upsert(newProfile)
         .select()
         .single();
       
       if (createError) {
         console.error('Auto-create error:', createError.message);
         // Return basic data for UX even if DB save fails
         return {
           id: session.user.id,
           username: newProfile.name,
           role: newProfile.role,
           email: session.user.email
         };
       }

       return {
         id: session.user.id,
         username: created.name,
         role: created.role,
         email: session.user.email
       };
    }

    return {
      id: session.user.id,
      name: profile.name || session.user.email,
      role: profile.role || ROLES.STUDENT,
      email: session.user.email
    };
  };

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      try {
        if (session) {
          const userData = await fetchProfile(session);
          setUser(userData);
        }
      } catch (err) {
        console.error('Session loading error:', err);
      } finally {
        setLoading(false);
      }
    });

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      try {
        if (session) {
          const userData = await fetchProfile(session);
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Auth change error:', err);
      } finally {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  };

  const signUp = async (email, password, name, role) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, role }
      }
    });
    if (error) throw error;
    return data;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error logging out:', error.message);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signUp, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
