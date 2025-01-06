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
  const { data: userProfile } = await supabase
    .from('admin_authentication') // Asegúrate de que esta es la tabla correcta
    .select('role')
    .eq('id', user.id)
    .single();

  if (userProfile) {
    user.role = userProfile.role;
  }

  return { user };
}

export async function logout() {
  await supabase.auth.signOut();
}