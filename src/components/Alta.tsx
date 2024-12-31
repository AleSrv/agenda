import { UserPlus } from 'lucide-react';
import { usePersonas } from '../hooks/usePersonas';
import { PersonaForm } from './PersonaForm';

export function Alta() {
  const { agregarPersona, cargando } = usePersonas();

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <UserPlus className="w-6 h-6" />
        Agregar Cliente
      </h2>
      <PersonaForm
        onSubmit={agregarPersona}
        submitText="Agregar Persona"
        loading={cargando}
      />
    </div>
  );
}