import { User } from "@/types/Users";
import { instanciaAxios } from "./axios";

export const authService = {
    register: async (user: User) => {
        let response = null;

        try {
            response = await instanciaAxios.post('/auth/register', user);

            if (response.status == 200) {
                return {
                    error: false,
                    title: 'Exito',
                    message: `Usuario registrado correctamente`,
                    data: response
                }
            }

        } catch (error) {

            return {
                error: true,
                title: 'Error',
                message: `No se pudo registrar el usuario`,
                data: response
            }

        }

        return {
            error: true,
            title: 'Error',
            message: `La peticion dio error ${response.status}`,
            data: response
        }
    }
};
