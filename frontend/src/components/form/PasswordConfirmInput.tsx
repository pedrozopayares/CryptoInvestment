import React, { useState } from 'react';
import { InputProps } from '@/types/Input';

const PasswordConfirmInput: React.FC<InputProps> = ({ onChange, name, id }) => {

  const [invalidClass, setInvalidClass] = useState("");

  const validate = (password: string) =>{
    setInvalidClass("");
    const regex = /^[a-zA-Z0-9@#$%&!?]{6,8}/;
    const isValid = regex.test(password);

    if(!isValid){
      setInvalidClass("invalid-input");
    }
  }

  const onUdaptePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    validate(password);
    onChange != undefined ? onChange(e): null;
  }

  return (
    <input
      id={id ? id : "passwordConfirm"}
      name={name ? name : "passwordConfirm"}
      type="password" 
      placeholder='Confirme la contraseña' 
      className={ "input-style" + " " + invalidClass}
      onChange={ onUdaptePassword }
    />
  );
};

export default PasswordConfirmInput;
