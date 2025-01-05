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
  terminado?: boolean;
  servicio: 'instalacion' | 'reparacion';
  garantia: 'SI' | 'NO' | 'SIN DETERMINAR'; // Nuevo campo
  created_at: string;
  updated_at: string;
  modelo_tv?: string;
  ticket_eci?: string;
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
  terminado?: boolean;
  servicio: 'instalacion' | 'reparacion';
  garantia: 'SI' | 'NO' | 'SIN DETERMINAR'; // Nuevo campo
  modelo_tv?: string;
  ticket_eci?: string;
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
