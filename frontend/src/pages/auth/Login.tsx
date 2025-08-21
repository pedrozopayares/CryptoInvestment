import PrimaryButton from '@/components/form/PrimaryButton';
import EmailInput from '@/components/form/EmailInput';
import PasswordInput from '@/components/form/PasswordInput';
import { useState } from 'react';
import { notify } from '@/helpers/common';
import { signin } from '@/stores/userSlice';
import { AppDispatch } from '@/store';
import { useDispatch } from 'react-redux';
import Notify from '@/components/notify/Notify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch: AppDispatch = useDispatch();

  const handleSignIn = async () => {
    if (email === '') {
       notify.error('Email es requerido');
      return;
    }

    if (password === '') {
      notify.error('Password es requerido');
      return;
    }

    const result = await dispatch(signin({
      email,
      password
    }));

    if (result.meta.requestStatus === 'rejected') {
      // TODO: mejorar el tipado de errores a nivel global
      const errorMessage = (result.payload as { message: string })?.message || 'Error al iniciar sesión';
      notify.error(errorMessage);
      return;
    }

    notify.success('Usuario autenticado correctamente');
    window.location.href = '/home';
  };

  return (
    <div className="flex w-full h-full justify-center items-center">
      <Notify/>
      <form action="#" className="max-w-[480px] flex flex-col gap-y-6">
        <h1 className="text-4xl">Iniciar sesión</h1>
        { "Email: " + email }
        <EmailInput onChange={ (e) => setEmail(e.target.value) } />
        <PasswordInput onChange={ (e) => setPassword(e.target.value) } />
        <div className="columns-2"> 
          <PrimaryButton onClick={ handleSignIn }>
            Iniciar sesión
          </PrimaryButton>
        </div>
      </form>
    </div>
  )
}

export default Login;
