import React from 'react';
import { InputProps } from '@/types/Input';

const TextInput: React.FC<InputProps> = ({ onChange, name, placeholder, value }) => {


  return (
    <input
      name={name ? name : "text"}
      type="text"
      placeholder={ placeholder }
      value={value}
      className="input-style"
      onChange={(e) => onChange!= undefined ? onChange(e): null}
    />
  );
};

export default TextInput;
