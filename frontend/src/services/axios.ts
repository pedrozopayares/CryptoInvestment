import axios from 'axios';

export const instanciaAxios = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  //withCredentials: true,
  headers: { 
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
});

export default instanciaAxios;