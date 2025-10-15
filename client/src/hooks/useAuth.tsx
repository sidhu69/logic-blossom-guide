import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🔐 useAuth: Starting auth setup');
    
    let subscription: any;
    
    const setupAuth = async () => {
      try {
        // Set up auth state listener
        const { data } = supabase.auth.onAuthStateChange(
          (event, session) => {
            console.log('🔐 Auth state changed:', event);
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
          }
        );
        subscription = data.subscription;

        // Check for existing session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('❌ Error getting session:', sessionError);
          setError(sessionError.message);
        }
        
        console.log('🔐 Initial session:', sessionData.session ? 'Found' : 'None');
        setSession(sessionData.session);
        setUser(sessionData.session?.user ?? null);
        setLoading(false);
      } catch (err: any) {
        console.error('❌ useAuth setup error:', err);
        setError(err.message || 'Auth initialization failed');
        setLoading(false);
      }
    };

    setupAuth();

    return () => {
      console.log('🔐 useAuth: Cleaning up');
      subscription?.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log('🔐 Signing in...');
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) console.error('❌ Sign in error:', error);
      return { error };
    } catch (err: any) {
      console.error('❌ Sign in exception:', err);
      return { error: err };
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
    try {
      console.log('🔐 Signing up...');
      const redirectUrl = `${window.location.origin}/`;
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            username,
          },
        },
      });

      // Update profile with username
      if (data.user && !error) {
        await supabase
          .from('profiles')
          .update({ username })
          .eq('id', data.user.id);
      }

      return { error };
    } catch (err: any) {
      console.error('❌ Sign up exception:', err);
      return { error: err };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (err: any) {
      console.error('❌ Sign out exception:', err);
      return { error: err };
    }
  };

  return {
    user,
    session,
    loading,
    error,
    signIn,
    signUp,
    signOut,
  };
    }
