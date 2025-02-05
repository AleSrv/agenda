import { useState, useEffect } from 'react';
import { PersonaInput } from '../types';

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
  const [numeroAviso, setNumeroAviso] = useState('');

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
      setServicio(initialData.servicio);
      setGarantia(initialData.garantia);
      setTerminado(initialData.terminado || false);
      setNumeroAviso(initialData.numero_aviso || '');
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) {
      alert('El nombre es obligatorio');
      return;
    }

    const persona: PersonaInput = {
      nombre,
      direccion,
      telefono,
      codigo_postal: codigoPostal,
      descripcion,
      importe_a_cobrar: importeACobrar,
      soporte_tv: soporteTv,
      fecha_fijada: fechaFijada,
      modelo_tv: modeloTv,
      ticket_eci: ticketEci,
      servicio,
      garantia,
      terminado,
      numero_aviso: numeroAviso,
    };

    await onSubmit(persona);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <div className="mb-4">
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Nombre
        </label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
          disabled={loading}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Dirección
        </label>
        <input
          type="text"
          id="direccion"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
          disabled={loading}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Teléfono
        </label>
        <input
          type="text"
          id="telefono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
          disabled={loading}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="codigoPostal" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Código Postal
        </label>
        <input
          type="text"
          id="codigoPostal"
          value={codigoPostal}
          onChange={(e) => setCodigoPostal(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
          disabled={loading}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Descripción
        </label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
          disabled={loading}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="importeACobrar" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Importe a Cobrar
        </label>
        <input
          type="number"
          id="importeACobrar"
          value={importeACobrar}
          onChange={(e) => setImporteACobrar(Number(e.target.value))}
          className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
          disabled={loading}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="soporteTv" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Necesita Soporte TV
        </label>
        <input
          type="checkbox"
          id="soporteTv"
          checked={soporteTv}
          onChange={(e) => setSoporteTv(e.target.checked)}
          className="mt-1 block"
          disabled={loading}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="fechaFijada" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Fecha Fijada
        </label>
        <input
          type="date"
          id="fechaFijada"
          value={fechaFijada}
          onChange={(e) => setFechaFijada(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
          disabled={loading}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="modeloTv" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Modelo TV
        </label>
        <input
          type="text"
          id="modeloTv"
          value={modeloTv}
          onChange={(e) => setModeloTv(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
          disabled={loading}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="ticketEci" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Ticket ECI
        </label>
        <input
          type="text"
          id="ticketEci"
          value={ticketEci}
          onChange={(e) => setTicketEci(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
          disabled={loading}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="servicio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Servicio
        </label>
        <select
          id="servicio"
          value={servicio}
          onChange={(e) => setServicio(e.target.value as 'instalacion' | 'reparacion')}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-black dark:text-white"
          disabled={loading}
        >
          <option value="instalacion">Instalación</option>
          <option value="reparacion">Reparación</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="garantia" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Garantía
        </label>
        <select
          id="garantia"
          value={garantia}
          onChange={(e) => setGarantia(e.target.value as 'SI' | 'NO' | 'SIN DETERMINAR')}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-black dark:text-white"
          disabled={loading}
        >
          <option value="SI">SI</option>
          <option value="NO">NO</option>
          <option value="SIN DETERMINAR">SIN DETERMINAR</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="terminado" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Terminado
        </label>
        <input
          type="checkbox"
          id="terminado"
          checked={terminado}
          onChange={(e) => setTerminado(e.target.checked)}
          className="mt-1 block"
          disabled={loading}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="numeroAviso" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Número de Aviso
        </label>
        <input
          type="text"
          id="numeroAviso"
          value={numeroAviso}
          onChange={(e) => setNumeroAviso(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
          disabled={loading}
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-800"
        disabled={loading}
      >
        {submitText}
      </button>
    </form>
  );
}