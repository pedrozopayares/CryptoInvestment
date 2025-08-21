import PrimaryButton from '@/components/form/PrimaryButton';
import EmailInput from '@/components/form/EmailInput';
import PasswordInput from '@/components/form/PasswordInput';
import PasswordConfirmInput from '@/components/form/PasswordConfirmInput';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextInput from '@/components/form/TextInput';
import { useDispatch } from 'react-redux';
import { register } from '@/stores/userSlice';
import { AppDispatch } from '@/store';
import { notify } from '@/helpers/common';

const Register = () => {
  
  const dispatch: AppDispatch = useDispatch();

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });
  const navigate = useNavigate();

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name);
    const key = e.target.name;
    const value: string | boolean = e.target.value;
    setUser({
      ...user,
      [key]: value,
    });
  }

  const handleRegister = async () => {
    if (user.email === '') {
      toast.error('Email es requerido', {
        theme: "colored"
      });
      return;
    }

    if (user.password === '') {
      toast.error('Password es requerido', {
        theme: "colored"
      });
      return;
    }

    if (user.password !== user.passwordConfirm) {
      toast.error('Las contraseñas no coinciden', {
        theme: "colored"
      });
      return;
    }

    try {
      const result = await dispatch(register({ ...user }));

      if (result.meta.requestStatus === 'rejected') {
        const errorMessage =
          typeof result.payload === 'object' && result.payload && 'message' in result.payload
            ? (result.payload as { message?: string }).message
            : undefined;
        notify.error(errorMessage || 'Error al registrar el usuario');
        return;
      }
      
      toast.success('Usuario registrado correctamente', { theme: "colored" });
      setTimeout(() => {
        navigate('/login');
      }, 1200);
    } catch (error) {
      console.error(error);
      toast.error('Error al registrar el usuario', {
        theme: "colored"
      });
    }
  };

  return (
    <div className="flex w-full h-full justify-center items-center">
      <form action="#" className="max-w-[480px] flex flex-col gap-y-6">
        <h1 className="text-4xl">Registrarse</h1>
        <TextInput name="username" onChange={ handleUserChange } placeholder="Nombre" />
        <EmailInput onChange={ handleUserChange } />
        <PasswordInput onChange={ handleUserChange } />
        <PasswordConfirmInput onChange={ handleUserChange } />
        <div className="columns-2"> 
          <PrimaryButton onClick={ handleRegister }>
            Registrarse
          </PrimaryButton>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Register;
