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
  const [descripcion, setDescripcion] = useState(''); // Nuevo estado
  const [importeACobrar, setImporteACobrar] = useState<number | undefined>(undefined); // Nuevo estado
  const [soporteTv, setSoporteTv] = useState(false); // Nuevo estado

  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre);
      setDireccion(initialData.direccion || '');
      setTelefono(initialData.telefono || '');
      setCodigoPostal(initialData.codigo_postal || '');
      setDescripcion(initialData.descripcion || ''); // Inicializar nuevo estado
      setImporteACobrar(initialData.importe_a_cobrar); // Inicializar nuevo estado
      setSoporteTv(initialData.soporte_tv || false); // Inicializar nuevo estado
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
      descripcion: descripcion.trim() || undefined, // Incluir nuevo campo
      importe_a_cobrar: importeACobrar, // Incluir nuevo campo
      soporte_tv: soporteTv, // Incluir nuevo campo
    };

    await onSubmit(personaData);
    
    if (!initialData) {
      setNombre('');
      setDireccion('');
      setTelefono('');
      setCodigoPostal('');
      setDescripcion(''); // Resetear nuevo estado
      setImporteACobrar(undefined); // Resetear nuevo estado
      setSoporteTv(false); // Resetear nuevo estado
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
      <div>
        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
          Descripción
        </label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Ingrese una descripción (opcional)"
          disabled={loading}
        />
      </div>
      <div>
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
      <div className="flex items-center">
        <input
          type="checkbox"
          id="soporte_tv"
          checked={soporteTv}
          onChange={(e) => setSoporteTv(e.target.checked)}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          disabled={loading}
        />
        <label htmlFor="soporte_tv" className="ml-2 block text-sm font-medium text-gray-700">
          Soporte TV
        </label>
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