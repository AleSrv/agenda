import { useState, useEffect } from 'react';
import type { PersonaInput } from '../types';

interface PersonaFormProps {
  initialData?: PersonaInput;
  onSubmit: (data: PersonaInput) => Promise<void>;
  submitText: string;
  loading: boolean;
}

export function PersonaForm({ initialData, onSubmit, submitText, loading }: PersonaFormProps) {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [importeACobrar, setImporteACobrar] = useState<number | undefined>(undefined);
  const [soporteTv, setSoporteTv] = useState(false);
  const [fechaFijada, setFechaFijada] = useState('');
  const [modeloTv, setModeloTv] = useState('');
  const [ticketEci, setTicketEci] = useState('');
  const [servicio, setServicio] = useState<'instalacion' | 'reparacion'>('instalacion');
  const [garantia, setGarantia] = useState<'SI' | 'NO' | 'SIN DETERMINAR'>('SIN DETERMINAR');
  const [terminado, setTerminado] = useState(false);
  const [numeroAviso, setNumeroAviso] = useState(''); // Nuevo estado

  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre);
      setDireccion(initialData.direccion || '');
      setTelefono(initialData.telefono || '');
      setCodigoPostal(initialData.codigo_postal || '');
      setDescripcion(initialData.descripcion || '');
      setImporteACobrar(initialData.importe_a_cobrar);
      setSoporteTv(initialData.soporte_tv || false);
      setFechaFijada(initialData.fecha_fijada || '');
      setModeloTv(initialData.modelo_tv || '');
      setTicketEci(initialData.ticket_eci || '');
      setServicio(initialData.servicio || 'instalacion');
      setGarantia(initialData.garantia || 'SIN DETERMINAR');
      setTerminado(initialData.terminado || false);
      setNumeroAviso(initialData.numero_aviso || ''); // Inicializar nuevo estado
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) return;
  
    const personaData: PersonaInput = {
      nombre: nombre.trim(),
      direccion: direccion.trim() || undefined,
      telefono: telefono.trim() || undefined,
      codigo_postal: codigoPostal.trim() || undefined,
      descripcion: descripcion.trim() || undefined,
      importe_a_cobrar: importeACobrar,
      soporte_tv: soporteTv,
      fecha_fijada: fechaFijada || undefined,
      modelo_tv: modeloTv || undefined,
      ticket_eci: ticketEci || undefined,
      servicio,
      garantia,
      terminado,
      fecha_terminado: terminado ? new Date().toISOString() : undefined, // Nuevo campo
      numero_aviso: servicio === 'reparacion' ? numeroAviso.trim() || undefined : undefined,
    };
  
    await onSubmit(personaData);
  
    if (!initialData) {
      setNombre('');
      setDireccion('');
      setTelefono('');
      setCodigoPostal('');
      setDescripcion('');
      setImporteACobrar(undefined);
      setSoporteTv(false);
      setFechaFijada('');
      setModeloTv('');
      setTicketEci('');
      setServicio('instalacion');
      setGarantia('SIN DETERMINAR');
      setTerminado(false);
      setNumeroAviso('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4 w-full'>
      <div className="mb-4">
        <label htmlFor="servicio" className="block text-sm font-medium text-gray-700">
          Servicio
        </label>
        <select
          id="servicio"
          value={servicio}
          onChange={(e) => setServicio(e.target.value as 'instalacion' | 'reparacion')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          disabled={loading}
        >
          <option value="instalacion">Instalación</option>
          <option value="reparacion">Reparación</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="importe_a_cobrar" className="block text-sm font-medium text-gray-700">
          Importe a Cobrar
        </label>
        <input
          type="number"
          id="importe_a_cobrar"
          value={importeACobrar || ''}
          onChange={(e) => setImporteACobrar(parseFloat(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Ingrese el importe a cobrar (opcional)"
          disabled={loading}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="fecha_fijada" className="block text-sm font-medium text-gray-700">
          Fecha Fijada
        </label>
        <input
          type="date"
          id="fecha_fijada"
          value={fechaFijada}
          onChange={(e) => setFechaFijada(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Ingrese la fecha fijada (opcional)"
          disabled={loading}
        />
      </div>


      <div className="mb-4">
        <label htmlFor="numero_aviso" className="block text-sm font-medium text-gray-700">
          Nº de Aviso
        </label>
        <input
          type="text"
          id="numero_aviso"
          value={numeroAviso}
          onChange={(e) => setNumeroAviso(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Ingrese el Nº de Aviso"
          disabled={loading}
          autoComplete="off"
        />
      </div>
      {servicio === 'reparacion' && (
        <div className="mb-4">
          <label htmlFor="garantia" className="block text-sm font-medium text-gray-700">
            Garantía
          </label>
          <select
            id="garantia"
            value={garantia}
            onChange={(e) => setGarantia(e.target.value as 'SI' | 'NO' | 'SIN DETERMINAR')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            disabled={loading}
          >
            <option value="SI">Sí</option>
            <option value="NO">No</option>
            <option value="SIN DETERMINAR">Sin Determinar</option>
          </select>
        </div>
      )}
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="terminado"
          checked={terminado}
          onChange={(e) => setTerminado(e.target.checked)}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          disabled={loading}
        />
        <label htmlFor="terminado" className="ml-2 block text-sm font-medium text-gray-700">
          Terminado
        </label>
      </div>
      <div className="mb-4">
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
          autoComplete="name"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
          Dirección
        </label>
        <input
          type="text"
          id="direccion"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Ingrese la dirección"
          disabled={loading}
          autoComplete="street-address"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
          Teléfono
        </label>
        <input
          type="tel"
          id="telefono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Ingrese el teléfono"
          disabled={loading}
          autoComplete="tel"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="codigo_postal" className="block text-sm font-medium text-gray-700">
          Código Postal
        </label>
        <input
          type="text"
          id="codigo_postal"
          value={codigoPostal}
          onChange={(e) => setCodigoPostal(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Ingrese el código postal"
          disabled={loading}
          autoComplete="postal-code"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="modelo_tv" className="block text-sm font-medium text-gray-700">
          Modelo TV / Soundbar
        </label>
        <input
          type="text"
          id="modelo_tv"
          value={modeloTv}
          onChange={(e) => setModeloTv(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Ingrese el modelo de TV (opcional)"
          disabled={loading}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="ticket_eci" className="block text-sm font-medium text-gray-700">
          Ticket ECI
        </label>
        <input
          type="text"
          id="ticket_eci"
          value={ticketEci}
          onChange={(e) => setTicketEci(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Ingrese el ticket ECI (opcional)"
          disabled={loading}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
          Descripción
        </label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Ingrese la descripción"
          disabled={loading}
          autoComplete="off"
        />
      </div>

      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="soporte_tv"
          checked={soporteTv}
          onChange={(e) => setSoporteTv(e.target.checked)}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          disabled={loading}
        />
        <label htmlFor="soporte_tv" className="ml-2 block text-sm font-medium text-gray-700">
          Necesita Soporte TV
        </label>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          disabled={loading}
        >
          {submitText}
        </button>
      </div>
    </form>
  );
}