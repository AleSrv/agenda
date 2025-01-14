import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { PersonasProvider } from './context/PersonasProvider';
import { Alta } from './components/Alta';
import { Lista } from './components/Lista';
import Login from './components/Login';
import { authenticate } from './api/auth';
import { AuthenticatedUser } from './types';
// import Card from './components/Card'; // Asegúrate de importar el componente Card
import Card from './components/Card';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [, setLoading] = useState(false);
  const [user, setUser] = useState<AuthenticatedUser | null>(null);

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
      <div className="min-h-screen bg-gray-100 py-4">
        <div className="flex flex-col w-full items-center content-between gap-4">
          <div className="flex flex-row justify-start w-full max-w-2xl mx-auto  gap-4">
            <Card onLogout={handleLogout} />
            <Alta />
          </div>
          <Lista user={user} />
        </div>
      </div>
    </PersonasProvider>
  );
}

export default App;