import  { useEffect } from 'react';
import { Users, Trash2, RefreshCw } from 'lucide-react';
import { usePersonas } from '../context/PersonasContext';

export function Lista() {
  const { personas, cargando, error, obtenerListaPersonas, borrarPersona } = usePersonas();

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
          Lista de Personas
        </h2>
        <button
          title="Actualizar lista"
          onClick={() => obtenerListaPersonas()}
          disabled={cargando}
          className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
        >
          <RefreshCw className={`w-5 h-5 ${cargando ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {cargando ? (
        <div className="text-center p-4">Cargando...</div>
      ) : personas.length === 0 ? (
        <div className="text-center text-gray-500 p-4">
          No hay personas registradas
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {personas.map((persona) => (
            <li key={persona.id} className="py-4 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-900">{persona.nombre}</p>
                {persona.direccion && (
                  <p className="text-sm text-gray-600">{persona.direccion}</p>
                )}
                {persona.telefono && (
                  <p className="text-sm text-gray-600">{persona.telefono}</p>
                )}
                <p className="text-sm text-gray-500">
                  Agregado: {new Date(persona.created_at).toLocaleDateString()}
                </p>
              </div>
              <button
                title="Borrar persona"
                onClick={() => borrarPersona(persona.id)}
                className="p-2 text-red-600 hover:text-red-900 rounded-full hover:bg-red-50"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}