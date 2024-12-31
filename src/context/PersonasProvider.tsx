import React, { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { obtenerPersonas, crearPersona, actualizarPersona, eliminarPersona } from '../api/personas';
import { PersonasContext } from './PersonasContext';
import type { Persona, PersonaInput } from '../types';

export function PersonasProvider({ children }: { children: React.ReactNode }) {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // (GET) useCallback para evitar que la función se cree en cada renderizado
  const obtenerListaPersonas = useCallback(async () => {
    try {
      setCargando(true);
      const data = await obtenerPersonas();
      setPersonas(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar personas');
      toast.error('Error al cargar la lista de personas');
    } finally {
      setCargando(false);
    }
  }, []);

  // (POST) 
  const agregarPersona = useCallback(async (persona: PersonaInput) => {
    try {
      setCargando(true);
      await crearPersona(persona);
      toast.success('Persona agregada exitosamente');
      await obtenerListaPersonas();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al agregar persona');
      toast.error('Error al agregar persona');
    } finally {
      setCargando(false);
    }
  }, [obtenerListaPersonas]);

  // (PUT)
  const modificarPersona = useCallback(async (id: string, persona: PersonaInput) => {
    try {
      setCargando(true);
      await actualizarPersona(id, persona);
      toast.success('Persona actualizada exitosamente');
      await obtenerListaPersonas();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar persona');
      toast.error('Error al actualizar persona');
    } finally {
      setCargando(false);
    }
  }, [obtenerListaPersonas]);

  // (DELETE)
  const borrarPersona = useCallback(async (id: string) => {
    try {
      setCargando(true);
      await eliminarPersona(id);
      toast.success('Persona eliminada exitosamente');
      await obtenerListaPersonas();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar persona');
      toast.error('Error al eliminar persona');
    } finally {
      setCargando(false);
    }
  }, [obtenerListaPersonas]);

  return (
    <PersonasContext.Provider
      value={{
        personas,
        cargando,
        error,
        obtenerListaPersonas,
        agregarPersona,
        modificarPersona,
        borrarPersona,
      }}
    >
      {children}
    </PersonasContext.Provider>
  );
}