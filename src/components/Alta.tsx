import { UserPlus, PanelTopOpen } from 'lucide-react';
import { usePersonas } from '../hooks/usePersonas';
import { PersonaForm } from './PersonaForm';
import { useState } from 'react';
import { PersonaInput } from '../types';

export function Alta() {
  const { agregarPersona, cargando } = usePersonas();
  const [show, setShow] = useState(false);

  const handleAgregarPersona = async (persona: PersonaInput) => {
    await agregarPersona(persona);
    setShow(false); // Ocultar el formulario después de agregar la persona
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2
        className="text-2xl font-bold mb-6 flex items-center gap-2
         bg-slate-600 p-2 rounded-lg text-white cursor-pointer
         hover:bg-slate-700 justify-between
         "
        onClick={() => setShow(!show)}
      >
        <UserPlus className="w-6 h-6" />
        <p>Agregar Cliente </p><PanelTopOpen className="w-6 h-6" />
      </h2>
      {show && (
        <PersonaForm
          onSubmit={handleAgregarPersona}
          submitText="Agregar Cliente"
          loading={cargando}
        />
      )}

    </div>
  );
}