import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { PersonasProvider } from './context/PersonasProvider';
import { Alta } from './components/Alta';
import { Lista } from './components/Lista';
import Login from './components/Login';
import { authenticate } from './api/auth';
import { AuthenticatedUser } from './types';
import Card from './components/Card';
import Filtro from './components/Filtro';
import Switches from './components/Switches';
import DarkModeSwitch from './components/DarkModeSwitch';
// import DarkModeSwitch from './components/DarkModeSwitch';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [, setLoading] = useState(false);
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [filterQuery, setFilterQuery] = useState('');
  const [filters, setFilters] = useState({ verPendientes: true, verInstalaciones: true, verReparaciones: true });
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const handleLogin = async (username: string, password: string) => {
    setLoading(true);
    const result = await authenticate(username, password);
    setLoading(false);

    if (result) {
      setIsAuthenticated(true);
      setUser(result.user);
    } else {
      alert('Credenciales incorrectas');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <PersonasProvider>
      <Toaster position="top-right" />
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} py-4`}>
        <div className="flex flex-col w-full items-center content-between gap-4">
          <DarkModeSwitch darkMode={darkMode} setDarkMode={setDarkMode} />
          <div className="flex flex-row w-full max-w-2xl gap-4">
            <Card onLogout={handleLogout} />
            <Alta />
          </div>
          <Filtro onFilter={setFilterQuery} />
          <Switches onSwitchChange={setFilters} />
          <Lista user={user} filterQuery={filterQuery} filters={filters} />
        </div>
      </div>
    </PersonasProvider>
  );
}

export default App;