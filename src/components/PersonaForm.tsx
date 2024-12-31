import { useState, useEffect } from 'react';
import type { PersonaInput } from '../types';

interface PersonaFormProps {
  onSubmit: (persona: PersonaInput) => Promise<void>;
  initialData?: PersonaInput;
  submitText: string;
  loading: boolean;
}

export function PersonaForm({ onSubmit, initialData, submitText, loading }: PersonaFormProps) {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [codigoPostal, setCodigoPostal] = useState(''); 

  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre);
      setDireccion(initialData.direccion || '');
      setTelefono(initialData.telefono || '');
      setCodigoPostal(initialData.codigo_postal || ''); 
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    const personaData: PersonaInput = {
      nombre: nombre.trim(),
      direccion: direccion.trim() || undefined,
      telefono: telefono.trim() || undefined,
    };

    await onSubmit(personaData);
    
    if (!initialData) {
      setNombre('');
      setDireccion('');
      setTelefono('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
          Nombre
        </label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Ingrese el nombre"
          disabled={loading}
        />
      </div>
      <div>
        <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
          Dirección
        </label>
        <input
          type="text"
          id="direccion"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Ingrese la dirección (opcional)"
          disabled={loading}
        />
      </div>
      <div>
        <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
          Teléfono
        </label>
        <input
          type="tel"
          id="telefono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Ingrese el teléfono (opcional)"
          disabled={loading}
        />
      </div>
      <div>
        <label htmlFor="codigo_postal" className="block text-sm font-medium text-gray-700">
          Código Postal
        </label>
        <input
          type="text"
          id="codigo_postal"
          value={codigoPostal}
          onChange={(e) => setCodigoPostal(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Ingrese el código postal (opcional)"
          disabled={loading}
        />
      </div>
      <button
        type="submit"
        disabled={loading || !nombre.trim()}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {loading ? 'Procesando...' : submitText}
      </button>
    </form>
  );
}