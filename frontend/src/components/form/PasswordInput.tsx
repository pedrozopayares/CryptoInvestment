import React,{ useState} from 'react';
import { InputProps } from '@/types/Input';

const PasswordInput: React.FC<InputProps> = ({ onChange, name,id }) => {

  const [invalidClass, setInvalidClass] = useState("");

  const validate = (password: string) => {
    setInvalidClass("");
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{6,8}$/;
    const isValid = regex.test(password);

    if (!isValid) {
      setInvalidClass("invalid-input");
    }
  }

  const onUpdatePasword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    validate(password);
    onChange != undefined ? onChange(e): null;
  }

  return (
    <input
      id={id ? id:"password"}
      name={name ? name : "password"}
      type="password" 
      placeholder='Contraseña' 
      className={"input-style" + " " + invalidClass }
      onChange={onUpdatePasword}
    />
  );
};

export default PasswordInput;
