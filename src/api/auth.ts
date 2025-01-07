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

  const user = data.user as AuthenticatedUser;

  return { user };
}

export async function logout() {
  await supabase.auth.signOut();
}