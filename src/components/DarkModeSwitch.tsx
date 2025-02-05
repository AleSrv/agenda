import { Switch } from '@headlessui/react';

interface DarkModeSwitchProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const DarkModeSwitch: React.FC<DarkModeSwitchProps> = ({ darkMode, setDarkMode }) => {
  return (
    <div className="flex items-center justify-between w-full max-w-2xl p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-4">
      <span className="text-gray-900 dark:text-gray-100">Modo Oscuro</span>
      <Switch
        checked={darkMode}
        onChange={setDarkMode}
        className={`${darkMode ? 'bg-blue-500' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
      >
        <span className="sr-only">Modo Oscuro</span>
        <span
          className={`${darkMode ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform bg-white rounded-full transition`}
        />
      </Switch>
    </div>
  );
};

export default DarkModeSwitch;