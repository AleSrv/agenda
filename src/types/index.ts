export interface Persona {
  id: string;
  nombre: string;
  direccion?: string;
  telefono?: string;
  created_at: string;
  updated_at: string;
}

export interface PersonaInput {
  nombre: string;
  direccion?: string;
  telefono?: string;
}

export interface PersonasContextType {
  personas: Persona[];
  cargando: boolean;
  error: string | null;
  obtenerListaPersonas: () => Promise<void>;
  agregarPersona: (persona: PersonaInput) => Promise<void>;
  modificarPersona: (id: string, persona: PersonaInput) => Promise<void>;
  borrarPersona: (id: string) => Promise<void>;
}