import { createContext } from 'react';
import type { PersonasContextType } from '../types';

// Exportamos el contexto para que pueda ser importado por otros componentes
export const PersonasContext = createContext<PersonasContextType | undefined>(undefined);