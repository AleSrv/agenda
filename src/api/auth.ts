import { supabase } from '../lib/supabase';
import { AuthenticatedUser } from '../types';

export async function authenticate(username: string, password: string): Promise<{ user: AuthenticatedUser } | null> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: username,
    password: password,
  });

  if (error) {
    console.error('Error de autenticación:', error.message);
    return null;
  }

  return data.user ? { user: data.user as AuthenticatedUser } : null;
}

export async function logout() {
  await supabase.auth.signOut();
}
