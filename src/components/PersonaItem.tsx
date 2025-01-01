import { useState } from 'react';
import { Pencil, Trash2, X } from 'lucide-react';
import type { Persona, PersonaInput } from '../types';
import { PersonaForm } from './PersonaForm';

interface PersonaItemProps {
  persona: Persona;
  onDelete: (id: string) => Promise<void>;
  onUpdate: (id: string, data: PersonaInput) => Promise<void>;
  loading: boolean;
}

export function PersonaItem({ persona, onDelete, onUpdate, loading }: PersonaItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = async (data: PersonaInput) => {
    await onUpdate(persona.id, data);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li className="py-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-red-600">Editar Cliente</h3>
          <button
            onClick={() => setIsEditing(false)}
            className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
            title="Cancelar edición"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <PersonaForm
          initialData={persona}
          onSubmit={handleUpdate}
          submitText="Guardar Cambios"
          loading={loading}
        />
      </li>
    );
  }

  return (
    <li className="py-4 flex justify-between items-center">
      <div>
        <p className="text-sm font-medium text-gray-900">Nombre: {persona.nombre}</p>
        {persona.direccion && (
          <p className="text-sm text-gray-600">Dirección: {persona.direccion}</p>
        )}
        {persona.telefono && (
          <p className="text-sm text-gray-600">Teléfono: {persona.telefono}</p>
        )}
        {persona.codigo_postal && (
          <p className="text-sm text-gray-600">Código Postal: {persona.codigo_postal}</p>
        )}
        {persona.descripcion && (
          <p className="text-sm text-gray-600">Descripción: {persona.descripcion}</p>
        )}
        {persona.importe_a_cobrar !== undefined && (
          <p className="text-sm text-gray-600">Importe a Cobrar: ${persona.importe_a_cobrar}</p>
        )}
        {persona.soporte_tv && (
          <p className="text-sm text-gray-600">Soporte TV: Sí</p>
        )}
        {persona.fecha_fijada && (
          <p className="text-sm text-gray-600">Fecha Fijada: {new Date(persona.fecha_fijada).toLocaleDateString()}</p>
        )}
        <p className="text-sm text-gray-500">
          Agregado: {new Date(persona.created_at).toLocaleDateString()}
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setIsEditing(true)}
          disabled={loading}
          className="p-2 text-blue-600 hover:text-blue-900 rounded-full hover:bg-blue-50"
          title="Editar"
        >
          <Pencil className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDelete(persona.id)}
          disabled={loading}
          className="p-2 text-red-600 hover:text-red-900 rounded-full hover:bg-red-50"
          title="Eliminar"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </li>
  );
}