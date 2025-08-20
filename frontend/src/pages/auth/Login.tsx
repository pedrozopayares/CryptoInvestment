import PrimaryButton from '@/components/form/PrimaryButton';
import EmailInput from '@/components/form/EmailInput';
import PasswordInput from '@/components/form/PasswordInput';
import { instanciaAxios } from '@/services/axios';
import { useState } from 'react';

// Pasos para autenticar MI APLICACIÓN contra el servidor API:
// 1. Obtener el token CSRF
// 2. Enviar el token CSRF al servidor

// PASOS PARA AUTENTICAR UN USUARIO:
// 3. Enviar el formulario de login al servidor
// 4. Recibir la respuesta del servidor
// 5. Redirigir al usuario a la página de inicio

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = () => {
    instanciaAxios.post('/signin', {
      email,
      password
    });
  };

  return (
    <div className="flex w-full h-full justify-center items-center">
      <form action="#" className="max-w-[480px] flex flex-col gap-y-6">
        <h1 className="text-4xl">Iniciar sesión</h1>
        { "Email: " + email }
        <EmailInput onChange={ (e) => setEmail(e.target.value) } />
        <PasswordInput onChange={ (e) => setPassword(e.target.value) } />
        <div className="columns-2"> 
          <PrimaryButton onClick={ signIn }>
            Iniciar sesión
          </PrimaryButton>
        </div>
      </form>
    </div>
  )
}

export default Login;
