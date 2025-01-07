import { useState } from 'react';
import { Pencil, Trash2, X } from 'lucide-react';
import type { Persona, PersonaInput } from '../types';
import { PersonaForm } from './PersonaForm';

interface PersonaItemProps {
  persona: Persona;
  onDelete: (id: string) => Promise<void>;
  onUpdate: (id: string, data: PersonaInput) => Promise<void>;
  loading: boolean;
  user: { email: string } | null;
}

export function PersonaItem({ persona, onDelete, onUpdate, loading, user }: PersonaItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showlist, setShowlist] = useState(false);

  const handleUpdate = async (data: PersonaInput) => {
    await onUpdate(persona.id, data);
    setIsEditing(false);
  };

  const handleshowlist = () => {
    setShowlist(!showlist);
  };

  const today = new Date();
  const fechaFijada = persona.fecha_fijada ? new Date(persona.fecha_fijada) : null;
  const isFechaPasada = fechaFijada && fechaFijada < today;
  const isFechaProxima = fechaFijada && fechaFijada >= today && fechaFijada <= new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000);
  const isSinFecha = !persona.fecha_fijada;

  let bgColorClass = '';
  if (persona.terminado) {
    bgColorClass = 'bg-green-100';
  } else if (isFechaPasada || isSinFecha) {
    bgColorClass = 'bg-red-100';
  } else if (isFechaProxima) {
    bgColorClass = 'bg-orange-100';
  }

  if (isEditing) {
    return (
      <li className="p-4 mb-4 w-full max-w-md">
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
    <li
      onClick={handleshowlist}
      className={`p-2 mb-1 flex flex-col rounded ${bgColorClass} cursor-pointer w-full `}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-4">
          <p className="text-sm font-medium text-gray-900">
            {persona.servicio.toUpperCase()}: {persona.nombre}
          </p>
          <span className="text-sm text-gray-600">
            Fecha Fijada: {persona.fecha_fijada
              ? new Date(persona.fecha_fijada).toLocaleDateString()
              : <span className="text-red-600">Sin datos</span>}
          </span>
          {persona.updated_at && (
            <span className="text-sm text-gray-600">
              Modificado: {new Date(persona.updated_at).toLocaleDateString()}
            </span>)}
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
          {user?.email !== "telemalaga@telemalaga.com" && (
            <button
              onClick={() => onDelete(persona.id)}
              disabled={loading}
              className="p-2 text-red-600 hover:text-red-900 rounded-full hover:bg-red-50"
              title="Eliminar"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
      <p className="text-sm text-gray-600">
        {persona.terminado ? <span className="text-green-600">Terminada</span> : <span className="text-red-600">Pendiente</span>}
      </p>
      {persona.servicio === 'reparacion' && (
        <>
          <p className="text-sm text-gray-600">Garantía: {persona.garantia}</p>
          <h2 className="text-sm font-medium text-gray-900">Nº de Aviso: {persona.numero_aviso}</h2>
        </>
      )}
      <p className="text-sm text-gray-500">Agregado: {new Date(persona.created_at).toLocaleDateString()}</p>
      {showlist && (
        <>
          <hr className="my-2 bg-inherit" />
          <p className="text-sm text-gray-600">Ticket ECI: {persona.ticket_eci}</p>
          <p className="text-sm text-gray-600">Dirección: {persona.direccion || 'Sin datos'}</p>
          <p className="text-sm text-gray-600">Teléfono: {persona.telefono || 'Sin datos'}</p>
          <p className="text-sm text-gray-600">Código Postal: {persona.codigo_postal || 'Sin datos'}</p>
          <hr className="my-2 bg-inherit" />
          <p className="text-sm text-gray-600">Modelo Tv / Soundbar: {persona.modelo_tv}</p>
          <p className="text-sm text-gray-600">Descripción: {persona.descripcion || 'Sin datos'}</p>
          <p className="text-sm text-gray-600">Importe a Cobrar: {persona.importe_a_cobrar !== undefined && persona.importe_a_cobrar !== null ? `${persona.importe_a_cobrar}€` : '0€'}</p>
          <p className="text-sm text-gray-600">Necesita Soporte TV: {persona.soporte_tv !== undefined ? (persona.soporte_tv ? 'Sí' : 'No') : 'Sin datos'}</p>
        </>
      )}
    </li>
  );
}