import axios from 'axios';

export const instanciaAxios = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  //withCredentials: true,
  headers: { 
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
});

// Interceptor para agregar el token JWT a las peticiones de /admin si existe
instanciaAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.url && config.url.includes('/admin')) {
    // Asegura que los headers sean del tipo correcto
    if (config.headers && typeof config.headers === 'object') {
      // Axios v1: config.headers puede ser un objeto plano o AxiosHeaders
      if ('set' in config.headers && typeof config.headers.set === 'function') {
        config.headers.set('Authorization', `Bearer ${token}`);
      } else {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
  }
  return config;
});

export default instanciaAxios;