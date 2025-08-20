import PrimaryButton from '@/components/form/PrimaryButton';
import EmailInput from '@/components/form/EmailInput';
import PasswordInput from '@/components/form/PasswordInput';
import PasswordConfirmInput from '@/components/form/PasswordConfirmInput';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextInput from '@/components/form/TextInput';
import { authService } from '@/services/authService';

// Pasos para loguearme en la app Laravel:
// 1. Obtener el token CSRF
// 2. Enviar el token CSRF al servidor
// 3. Enviar el formulario de registro al servidor
// 4. Recibir la respuesta del servidor
// 5. Redirigir al usuario a la página de inicio

const Register = () => {
  
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name);
    const key = e.target.name;
    const value: string | boolean = e.target.value;
    setUser({
      ...user,
      [key]: value,
    });
  }

  const register = async () => {

    // Happy path = camino feliz
    // Email es válido
    if (user.email === '') {
      toast.error('Email es requerido', {
        theme: "colored"
      });
      return;
    }
    // Password es válido
    if (user.password === '') {
      toast.error('Password es requerido', {
        theme: "colored"
      });
      return;
    }

    // Password === PasswordConfirm
    if (user.password !== user.passwordConfirm) {
      toast.error('Las contraseñas no coinciden', {
        theme: "colored"
      });
      return;
    }

    try {
      const response = await authService.register({...user });

      console.log(response.data);
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
          <PrimaryButton onClick={ register }>
            Registrarse
          </PrimaryButton>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Register;
