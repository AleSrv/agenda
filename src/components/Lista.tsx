import { useEffect } from 'react';
import { usePersonas } from '../hooks/usePersonas';
import { PersonaItem } from './PersonaItem';

interface ListaProps {
  user: { email: string } | null;
  filterQuery: string;
  filters: { verPendientes: boolean; verInstalaciones: boolean; verReparaciones: boolean };
}

export function Lista({ user, filterQuery, filters }: ListaProps) {
  const {
    personas,
    cargando,
    error,
    obtenerListaPersonas,
    borrarPersona,
    modificarPersona
  } = usePersonas();

  useEffect(() => {
    obtenerListaPersonas();
  }, [obtenerListaPersonas]);

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        Error al cargar las personas
      </div>
    );
  }

  const filteredPersonas = personas.filter(persona => {
    const query = filterQuery.toLowerCase();
    const matchesQuery = (
      persona.nombre.toLowerCase().includes(query) ||
      persona.telefono?.toLowerCase().includes(query) ||
      persona.ticket_eci?.toLowerCase().includes(query) ||
      persona.modelo_tv?.toLowerCase().includes(query) ||
      persona.numero_aviso?.toLowerCase().includes(query)
    );

    const matchesFilters = (
      (filters.verPendientes ? !persona.terminado : true) &&
      ((filters.verInstalaciones && persona.servicio === 'instalacion') ||
      (filters.verReparaciones && persona.servicio === 'reparacion'))
    );

    return matchesQuery && matchesFilters;
  });

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-4">
      {cargando && personas.length === 0 ? (
        <div className="text-center p-4">Cargando...</div>
      ) : filteredPersonas.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 p-4">
          No hay personas registradas
        </div>
      ) : (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredPersonas.map((persona) => (
            <PersonaItem
              key={persona.id}
              persona={persona}
              onDelete={borrarPersona}
              onUpdate={modificarPersona}
              loading={cargando}
              user={user}
            />
          ))}
        </ul>
      )}
    </div>
  );
}