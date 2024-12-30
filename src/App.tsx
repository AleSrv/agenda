import { Toaster } from 'react-hot-toast';
import { PersonasProvider } from './context/PersonasContext';
import { Alta } from './components/Alta';
import { Lista } from './components/Lista';

function App() {
  return (
    <PersonasProvider>
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <Alta />
          <Lista />
        </div>
      </div>
      <Toaster position="top-right" />
    </PersonasProvider>
  );
}

export default App;