import { useState } from 'react';

interface SwitchesProps {
  onSwitchChange: (filters: { verPendientes: boolean; verInstalaciones: boolean; verReparaciones: boolean }) => void;
}

const Switches: React.FC<SwitchesProps> = ({ onSwitchChange }) => {
  const [verPendientes, setVerPendientes] = useState(true);
  const [verInstalaciones, setVerInstalaciones] = useState(false);
  const [verReparaciones, setVerReparaciones] = useState(false);

  const handleSwitchChange = (switchName: string) => {
    const newState = {
      verPendientes,
      verInstalaciones,
      verReparaciones,
      [switchName]: !eval(switchName),
    };
    setVerPendientes(newState.verPendientes);
    setVerInstalaciones(newState.verInstalaciones);
    setVerReparaciones(newState.verReparaciones);
    onSwitchChange(newState);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md mb-4 flex justify-around">
      <button
        className={`px-4 py-2 rounded ${verPendientes ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        onClick={() => handleSwitchChange('verPendientes')}
      >
        Ver Pendientes
      </button>
      <button
        className={`px-4 py-2 rounded ${verInstalaciones ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        onClick={() => handleSwitchChange('verInstalaciones')}
      >
        Ver Instalaciones
      </button>
      <button
        className={`px-4 py-2 rounded ${verReparaciones ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        onClick={() => handleSwitchChange('verReparaciones')}
      >
        Ver Reparaciones
      </button>
    </div>
  );
};

export default Switches;