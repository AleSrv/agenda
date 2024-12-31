import { useContext } from 'react';
import { PersonasContext } from '../context/PersonasContext';

export function usePersonas() {
  const context = useContext(PersonasContext);
  if (context === undefined) {
    throw new Error('usePersonas debe usarse dentro de un PersonasProvider');
  }
  return context;
}