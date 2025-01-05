import { supabase } from '../lib/supabase';
import type { Persona, PersonaInput } from '../types';

export async function obtenerPersonas(): Promise<Persona[]> {
  const { data: personasNoTerminadas, error: errorNoTerminadas } = await supabase
    .from('personas')
    .select('*')
    .eq('terminado', false)
    .order('fecha_fijada', { ascending: true, nullsFirst: true });

  if (errorNoTerminadas) throw errorNoTerminadas;

  const { data: personasTerminadas, error: errorTerminadas } = await supabase
    .from('personas')
    .select('*')
    .eq('terminado', true)
    .order('created_at', { ascending: true });

  if (errorTerminadas) throw errorTerminadas;

  return [...personasNoTerminadas, ...personasTerminadas];
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