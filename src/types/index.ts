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
  fecha_terminado?: string; // Nuevo campo
  servicio: 'instalacion' | 'reparacion';
  garantia: 'SI' | 'NO' | 'SIN DETERMINAR';
  created_at: string;
  updated_at: string;
  modelo_tv?: string;
  ticket_eci?: string;
  numero_aviso?: string; 
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
  fecha_terminado?: string; // Nuevo campo
  servicio: 'instalacion' | 'reparacion';
  garantia: 'SI' | 'NO' | 'SIN DETERMINAR';
  modelo_tv?: string;
  ticket_eci?: string;
  numero_aviso?: string; 
}

export interface AuthenticatedUser {
  id: string;
  email: string;
  imagen_ruta?: string;
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
