import { useState } from 'react';
import { Pencil, Trash2, X, Speech, CheckCircle } from 'lucide-react';
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
    try {
      await onUpdate(persona.id, data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error al actualizar persona:', error);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('Está por eliminar un Servicio. ¿Está seguro?');
    if (confirmed) {
      await onDelete(persona.id);
    }
  };

  const handleTerminar = async () => {
    const confirmed = window.confirm('Cerrar caso?');
    if (confirmed) {
      const fechaTerminado = new Date().toISOString();
      await handleUpdate({ ...persona, terminado: true, fecha_terminado: fechaTerminado });
    }
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
      <div id='columnas' className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">

        <div id='nombre' className="flex flex-col gap-1 shadow-md p-2">
          <p className="text-sm font-medium text-gray-900">
            {persona.servicio.toUpperCase()}
          </p>
          <p className="text-sm font-medium text-gray-900">
            {persona.nombre}
          </p>
          <p className="text-sm text-gray-600">
            {persona.terminado ? <span className="text-green-600">Terminada</span> : <span className="text-red-600">Pendiente</span>}
          </p>
          <div>
            {persona.servicio === 'reparacion' && (
              <div>
                <p className="text-sm text-gray-600">Garantía: {persona.garantia}</p>
                <p className="text-sm font-medium text-gray-900">Nº de Aviso: {persona.numero_aviso}</p>
              </div>
            )}
          </div>
        </div>

        <div id='fechas' className='flex flex-col gap-1 p-2 shadow-md'>
          <span className="text-sm text-gray-600 font-bold">
            Fecha Fijada: {persona.fecha_fijada
              ? <div>
                {new Date(persona.fecha_fijada).toLocaleDateString()}
              </div>
              : <p className="text-red-600">Sin datos</p>}
          </span>
          {!persona.terminado && persona.fecha_fijada && (
            <div className="w-8 h-8 flex items-center justify-center bg-slate-700 rounded-full">
              <Speech className="w-5 h-5 text-yellow-300 animate-pulse" />
            </div>
          )}
        </div>

        <div id='estado' className="flex flex-col gap-1 shadow-md p-2">
          <p className="text-sm text-gray-500">Agregado: {new Date(persona.created_at).toLocaleDateString()}</p>
          <div>
            {persona.updated_at && (
              <span className="text-sm text-gray-600">
                (Modificado: {new Date(persona.updated_at).toLocaleDateString()})
              </span>)}
          </div>
        </div>

        <div id='botones' className="flex flex-col items-center justify-center gap-2 p-2 shadow-md">
          <button
            onClick={() => setIsEditing(true)}
            disabled={loading}
            className="p-2 text-blue-600 hover:text-blue-900 rounded-full hover:bg-blue-50 flex items-center gap-1"
            title="Editar"
          >
            <Pencil className="w-5 h-5" /> 
            <span>Editar</span>
          </button>

          {user?.email !== "telemalaga@telemalaga.com" && (
            <button
              onClick={handleDelete}
              disabled={loading}
              className="p-2 text-red-600 hover:text-red-900 rounded-full hover:bg-red-50 flex items-center gap-1"
              title="Eliminar"
            >
              <Trash2 className="w-5 h-5" />
              <span>Eliminar</span>
            </button>
          )}

          <button
            onClick={handleTerminar}
            disabled={loading}
            className="p-2 text-green-600 hover:text-green-900 rounded-full hover:bg-green-50 flex items-center gap-1"
            title="Terminar"
          >
            <CheckCircle className="w-5 h-5" />
            <span>Terminar</span>
          </button>
        </div>
      </div>
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