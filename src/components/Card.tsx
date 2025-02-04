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
      className=" p-4 bg-white rounded-lg shadow-md  cursor-pointer  hover:bg-red-100 hover:text-red-900 m-auto"
      title="Cerrar sesión"
      onClick={handleLogout}
    >
      <Power className="w-5 h-5 text-red-600" />
    </div>
  );
};

export default Card;
