import { logout } from '../api/auth';
import { Power } from 'lucide-react';

interface CardProps {
  onLogout: () => void;
}

const Card: React.FC<CardProps> = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      await logout();
      onLogout();
    } catch (error) {
      console.error(error);
    } 
  }

  return (
    <div
      className="flex flex-col p-4 bg-white rounded-lg shadow-md items-center justify-center cursor-pointer  hover:bg-red-100 hover:text-red-900 mx-auto"
      title="Cerrar sesión"
      onClick={handleLogout}
    >
      <Power className="w-5 h-5 text-red-600" />
    </div>
  );
};

export default Card;
