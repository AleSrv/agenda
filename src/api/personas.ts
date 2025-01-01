import { supabase } from '../lib/supabase';
import type { Persona, PersonaInput } from '../types';

export async function obtenerPersonas(): Promise<Persona[]> {
  const { data, error } = await supabase
    .from('personas')
    .select('*')
    .order('fecha_fijada', { ascending: true, nullsFirst: true });

  if (error) throw error;
  return data;
}

export async function crearPersona(persona: PersonaInput): Promise<Persona> {
  const { data, error } = await supabase
    .from('personas')
    .insert([persona])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function actualizarPersona(id: string, persona: PersonaInput): Promise<Persona> {
  const { data, error } = await supabase
    .from('personas')
    .update(persona)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function eliminarPersona(id: string): Promise<void> {
  const { error } = await supabase
    .from('personas')
    .delete()
    .eq('id', id);

  if (error) throw error;
}