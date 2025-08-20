import React from 'react';
import { InputProps } from '@/types/Input';

const PhoneInput: React.FC<InputProps> = ({ onChange, name, placeholder, value }) => {

  const inputStyle = `transition duration-200 ease-in-out w-full text-sm 
  border-slate-200 shadow-sm rounded-md 
  placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary 
  focus:ring-opacity-20 focus:border-primary focus:border-opacity-40
  block px-4 py-3 intro-x min-w-full`;

  return (
    <input
      name={name ? name : "phone"}
      type="phone"
      placeholder={ placeholder }
      className={inputStyle}
      value={value}
      onChange={(e) => onChange!= undefined ? onChange(e): null}
    />
  );
};

export default PhoneInput;
