import { useEffect } from 'react';
import { Users, RefreshCw } from 'lucide-react';
import { usePersonas } from '../hooks/usePersonas';
import { PersonaItem } from './PersonaItem';

interface ListaProps {
  user: { email: string } | null;
}

export function Lista( { user }: ListaProps ) {
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
      <div className="text-red-500 text-center p-4">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Users className="w-6 h-6" />
          Lista de Clientes
        </h2>
        <button
          title="Refresh list"
          onClick={() => obtenerListaPersonas()}
          disabled={cargando}
          className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
        >
          <RefreshCw className={`w-8 h-8 ${cargando ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {cargando && personas.length === 0 ? (
        <div className="text-center p-4">Cargando...</div>
      ) : personas.length === 0 ? (
        <div className="text-center text-gray-500 p-4">
          No hay personas registradas
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {personas.map((persona) => (
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