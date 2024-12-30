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