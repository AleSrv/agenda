import { supabase } from '../lib/supabase';

export async function authenticate(username: string, password: string): Promise<boolean> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: username,
    password: password,
  });

  if (error) {
    console.error('Error de autenticación:', error.message);
    return false;
  }

  return !!data.user;
}