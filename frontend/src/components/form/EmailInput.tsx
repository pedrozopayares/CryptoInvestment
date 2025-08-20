import React, { useState } from 'react';
import { InputProps } from '@/types/Input';

const EmailInput: React.FC<InputProps> = ({ onChange, name, id, value }) => {

  const [invalidClass, setInvalidClass] = useState("");

  const validate = (email: string) => {
    setInvalidClass("");
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const isValid = regex.test(email);

    if (!isValid) {
      setInvalidClass("invalid-input");
    }
  }

  const onUpdateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    validate(email);
    onChange != undefined ? onChange(e): null;
  }

  return (
    <input
      id={id ? id : "email"}
      name={ name ? name : "email" }
      type="email"
      value={value}
      placeholder='Correo electrónico'
      className={ "input-style" + " " + invalidClass }
      onChange={ onUpdateEmail }
    />
  );
};

export default EmailInput;
