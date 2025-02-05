import { useState } from 'react';

interface FiltroProps {
  onFilter: (query: string) => void;
}

const Filtro: React.FC<FiltroProps> = ({ onFilter }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onFilter(e.target.value);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-4">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
        placeholder="Filtrar por nombre, teléfono, ticket, modelo TV o número de aviso"
      />
    </div>
  );
};

export default Filtro;