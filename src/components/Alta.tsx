import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { usePersonas } from '../context/PersonasContext';
import type { PersonaInput } from '../types';

export function Alta() {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const { agregarPersona, cargando } = usePersonas();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    const nuevaPersona: PersonaInput = {
      nombre: nombre.trim(),
      direccion: direccion.trim() || undefined,
      telefono: telefono.trim() || undefined,
    };

    await agregarPersona(nuevaPersona);
    setNombre('');
    setDireccion('');
    setTelefono('');
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <UserPlus className="w-6 h-6" />
        Agregar Persona
      </h2>
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
            disabled={cargando}
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
            disabled={cargando}
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
            disabled={cargando}
          />
        </div>
        <button
          type="submit"
          disabled={cargando || !nombre.trim()}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {cargando ? 'Agregando...' : 'Agregar Persona'}
        </button>
      </form>
    </div>
  );
}