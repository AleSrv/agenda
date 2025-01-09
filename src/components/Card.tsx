import React from 'react';
import { AuthenticatedUser } from '../types';
import { logout } from '../api/auth';
import { LogOut } from 'lucide-react';


interface CardProps {
  user: AuthenticatedUser | null;
  onLogout: () => void; // Añadir prop para manejar el logout
}

const URL_servicio = "https://eouipklcjejpzoiizmkn.supabase.co/storage/v1/object/sign/avatars/telemalaga.ico?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL3RlbGVtYWxhZ2EuaWNvIiwiaWF0IjoxNzM2MTg3MDI2LCJleHAiOjQ4ODk3ODcwMjZ9.zNUJGtHXCmlp60vHQCMstkRy8oivlKYsPCfxmJX3VuI&t=2025-01-06T18%3A10%3A26.965Z";

const URL_promotor = "https://eouipklcjejpzoiizmkn.supabase.co/storage/v1/object/sign/avatars/promotor.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL3Byb21vdG9yLnBuZyIsImlhdCI6MTczNjE4Nzg4MSwiZXhwIjo0ODg5Nzg3ODgxfQ.qybGteDt5VHaUshldR5T4mnvR3kX2TyFvT8ie150b8U&t=2025-01-06T18%3A24%3A41.333Z";

const Card: React.FC<CardProps> = ({ user, onLogout }) => {
  const handleLogout = async () => {
    await logout();
    onLogout();
  };

  return (
    <div className="w-36 h-36 bg-white rounded-lg shadow-md flex flex-col justify-center items-center ">
      <p className='rounded bg-inherit text-blue-900  m-2'>{user?.email === "telemalaga@telemalaga.com" ? "Servicio Tecnico " : "Promotor"}
      </p>
      <img
        src={user?.email === "telemalaga@telemalaga.com" ? URL_servicio : URL_promotor}
        alt="NO IMAGE"
        className="w-16 h-16 rounded  object-center bg-inherit p-2 mt-2"
      />
      <button
        onClick={handleLogout}
        className='bg-green-200 shadow-sm cursor-pointer rounded 
      hover:bg-green-400 m-2 w-24 h-8 flex justify-center items-center'
      >
        Salir
        <LogOut
          className='w-4 h-4 ml-1'
        />
      </button>
    </div>
  );
};

export default Card;