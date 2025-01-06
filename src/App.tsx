import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { PersonasProvider } from './context/PersonasProvider';
import { Alta } from './components/Alta';
import { Lista } from './components/Lista';
import Login from './components/Login';
import { authenticate } from './api/auth';
import { AuthenticatedUser } from './types';
import Card from './components/Card'; // Asegúrate de importar el componente Card

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
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

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <PersonasProvider>
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex flex-row "> 
            <Card user={user} />
            <Alta />
          </div>
          <Lista />
        </div>
      </div>
      <Toaster position="top-right" />
    </PersonasProvider>
  );
}

export default App;