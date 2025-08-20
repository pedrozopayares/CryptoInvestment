import React from 'react';
import { ButtonProps } from '@/types/Button';


const PrimaryButton: React.FC<ButtonProps> = ({ children, onClick, type = 'button', className = '', icon }) => {
  const buttonStyle = `transition duration-200 border shadow-sm flex 
                  items-center justify-center rounded-md font-medium 
                  cursor-pointer focus:ring-4 focus:ring-primary 
                  focus:ring-opacity-20 focus-visible:outline-none 
                  [&:hover:not(:disabled)]:bg-opacity-90 
                  [&:hover:not(:disabled)]:border-opacity-90 
                  [&:not(button)]:text-center bg-primary border-primary 
                  text-white px-4 py-3 ${className}`;
  return (
    <button
      id="button"
      type={type} 
      onClick={(e)=>onClick!= undefined ? onClick(e): null} 
      className={buttonStyle}
    >
     <div className='mr-2'>{icon}</div> 
      {children}
    </button>
  );
};

export default PrimaryButton;
