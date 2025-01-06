import React from 'react';
import { AuthenticatedUser } from '../types';
import { logout } from '../api/auth';

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
    <div className="w-36 h-36 p-1 bg-white rounded-lg shadow-md flex flex-col justify-center items-center">
      <p className='rounded bg-slate-700 text-white p-1 m-1'>{user?.email === "telemalaga@telemalaga.com" ? "Servicio Tecnico " : "Promotor"}
      </p>
      <img
        src={user?.email === "telemalaga@telemalaga.com" ? URL_servicio : URL_promotor}
        alt="NO IMAGE"
        className="w-16 h-16 rounded object-cover object-center"
      />
      <button onClick={handleLogout} className='bg-green-200 p-1 cursor-pointer m-1 rounded'>Logout</button>
    </div>
  );
};

export default Card;