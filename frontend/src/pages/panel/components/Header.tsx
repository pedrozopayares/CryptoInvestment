import React, { useState } from 'react';
import { User } from 'iconsax-react';
import { AppDispatch } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '@/stores/userSlice';


const Header: React.FC = () => {
        // Estado para manejar la visibilidad del menú del usuario
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { email } = useSelector((state: { user: { user: { email: string } | null } }) => state.user.user || { email: '' });
    const dispatch: AppDispatch = useDispatch();

    const handleLogout = () => {
        dispatch(signout());
        window.location.href = '/login';
    };

    // Función para alternar la visibilidad del menú del usuario
    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };
  return (
    <header className="bg-success text-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <div className="flex-shrink-0">
                    <a href="#">
                        <img className="h-12" src="/images/favicon.svg" alt="PortalAgro" />
                    </a>
                </div>
                <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
                </div>
               {/*  User Menu */}
               <div className="ml-4 flex items-center md:ml-6">
            <div className="relative">
              <div>
                <button type="button" className="max-w-xs border-2 rounded-full flex items-center text-sm" id="user-menu-button" aria-expanded="false" aria-haspopup="true" onClick={toggleUserMenu}>
                  <span className="sr-only">Abrir menú de usuario</span>
                  <User size="32" color="white"/>
                </button>
              </div>
              {/* Menú desplegable, mostrar/ocultar basado en el estado */}
              {isUserMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}>
                    <div className="block px-4 py-2 text-sm text-gray-700">{ email || '' }</div>
                    <a href="#" onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-0">Salir</a>
                </div>
              )}
            </div>
          </div>
            </div>
        </div>
      </header>
  );
};

export default Header;