import React, { useState } from 'react';
import { User } from 'iconsax-react';


const Header: React.FC = () => {
        // Estado para manejar la visibilidad del menú del usuario
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    // Función para alternar la visibilidad del menú del usuario
    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };
  return (
    <header className="bg-success text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <div className="flex-shrink-0">
                    <a href="#">
                        <img className="h-12" src="/images/favicon.svg" alt="PortalAgro" />
                    </a>
                </div>
                <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
                    <div className="max-w-lg w-full lg:max-w-xs">
                        <label className="sr-only">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-success" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 2a8 8 0 106.32 3.906 1 1 0 11-1.732-.998A6 6 0 1116 10a1 1 0 010 2 8 8 0 00-6-7.938V8a1 1 0 11-2 0V2.062A8 8 0 0010 2z" clipRule="evenodd"/>
                                </svg>
                            </div>
                            <input id="search" name="search" className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 text-gray-300 placeholder-blacks focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-600 sm:text-sm" placeholder="Search" type="search" />
                        </div>
                    </div>
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
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-0">Salir</a>
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