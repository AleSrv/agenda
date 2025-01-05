export interface Persona {
  id: string;
  nombre: string;
  direccion?: string;
  telefono?: string;
  codigo_postal?: string;
  descripcion?: string;
  importe_a_cobrar?: number;
  soporte_tv?: boolean;
  fecha_fijada?: string;
  modelo_tv?: string; // Nuevo campo
  ticket_eci?: string; // Nuevo campo
  created_at: string;
  updated_at: string;
  servicio: "instalacion" | "reparacion"; // Nuevo campo
}

export interface PersonaInput {
  nombre: string;
  direccion?: string;
  telefono?: string;
  codigo_postal?: string;
  descripcion?: string;
  importe_a_cobrar?: number;
  soporte_tv?: boolean;
  fecha_fijada?: string;
  modelo_tv?: string; // Nuevo campo
  ticket_eci?: string; // Nuevo campo
  servicio: "instalacion" | "reparacion"; // Nuevo campo
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
