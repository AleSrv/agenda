import React from 'react';
import { AuthenticatedUser } from '../types';

interface CardProps {
    user: AuthenticatedUser | null;
}

const Card: React.FC<CardProps> = ({ user }) => {
    return (
        <div className=" p-4 bg-white rounded shadow-md ">
            <h3 className="text-xl font-bold text-gray-800">Usuario:</h3>
            <p></p>
            <img
                src=
                {user?.email === "telemalaga@telemalaga.com" ? "../../public/telemalaga.ico" : "No identificado"}
                // user?.imagedata        
                alt="NO IMAGE"
                className="w-20 h-20 rounded object-cover object-center"
            />
        </div>
    );
};

export default Card;