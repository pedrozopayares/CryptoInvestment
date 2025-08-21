import React, { ReactNode } from 'react';
import { Outlet } from "react-router-dom";
import Header from '../pages/panel/components/Header';
import Sidebar from '../components/sidebar/Sidebar';
import Notify from '../components/notify/Notify';

interface PanelLayoutProps {
  children?: ReactNode; // ReactNode permite cualquier contenido React válido
}

const PanelLayout: React.FC<PanelLayoutProps> = () =>  {  
  return (
    <div className=''>
      <Notify/>
      <Header/>
      <div className="flex h-screen">
        <div className="w-full p-5">
          <Outlet/>
        </div>
      </div>
    </div>
  );
}

export default PanelLayout;
