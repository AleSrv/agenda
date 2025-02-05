import { useState } from 'react';
import { Switch } from '@headlessui/react';

interface SwitchesProps {
  onSwitchChange: (filters: { verPendientes: boolean; verInstalaciones: boolean; verReparaciones: boolean }) => void;
}

const Switches: React.FC<SwitchesProps> = ({ onSwitchChange }) => {
  const [verPendientes, setVerPendientes] = useState(true);
  const [verInstalaciones, setVerInstalaciones] = useState(true);
  const [verReparaciones, setVerReparaciones] = useState(true);

  const handleSwitchChange = (switchName: string, value: boolean) => {
    const newState = {
      verPendientes,
      verInstalaciones,
      verReparaciones,
      [switchName]: value,
    };
    setVerPendientes(newState.verPendientes);
    setVerInstalaciones(newState.verInstalaciones);
    setVerReparaciones(newState.verReparaciones);
    onSwitchChange(newState);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md mb-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span>Ver Pendientes</span>
        <Switch
          checked={verPendientes}
          onChange={(value) => handleSwitchChange('verPendientes', value)}
          className={`${verPendientes ? 'bg-blue-500' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className="sr-only">Ver Pendientes</span>
          <span
            className={`${verPendientes ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform bg-white rounded-full transition`}
          />
        </Switch>
      </div>
      <div className="flex items-center justify-between">
        <span>Ver Instalaciones</span>
        <Switch
          checked={verInstalaciones}
          onChange={(value) => handleSwitchChange('verInstalaciones', value)}
          className={`${verInstalaciones ? 'bg-blue-500' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className="sr-only">Ver Instalaciones</span>
          <span
            className={`${verInstalaciones ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform bg-white rounded-full transition`}
          />
        </Switch>
      </div>
      <div className="flex items-center justify-between">
        <span>Ver Reparaciones</span>
        <Switch
          checked={verReparaciones}
          onChange={(value) => handleSwitchChange('verReparaciones', value)}
          className={`${verReparaciones ? 'bg-blue-500' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className="sr-only">Ver Reparaciones</span>
          <span
            className={`${verReparaciones ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform bg-white rounded-full transition`}
          />
        </Switch>
      </div>
    </div>
  );
};

export default Switches;