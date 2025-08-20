import React, { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode; // ReactNode permite cualquier contenido React válido
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) =>  {                              
  return (
    <>
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
        <div className="relative z-10 bg-[url('/images/intro-0.jpg')] bg-no-repeat bg-cover bg-center before:content-['']
            before:absolute
            before:inset-0
            before:block
            before:bg-gradient-to-b
            before:from-primary
            before:to-primary-dark
            before:opacity-75
            before:z-[-5]  p-4">
          
          <img src="/images/favicon.svg" alt="CryptoInvestment: Panel de usuario" />
        </div>
        <div className="p-4">
          { children }
        </div>
      </div>
    </>
  );
}

export default AuthLayout;
