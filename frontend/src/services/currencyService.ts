import { instanciaAxios } from "./axios";
import { AxiosError } from "axios";

export const currencyService = {
    getCurrencies: async () => {
        let response = null;

        try {
            response = await instanciaAxios.get('/admin/cryptocurrencies');

            return {
                error: false,
                title: 'Exito',
                message: `Monedas obtenidas correctamente`,
                data: response.data
            }

        } catch (error) {

            if (error instanceof AxiosError && error.response) {
                return {
                    error: true,
                    title: 'Error',
                    message: error.response.data.error || error.message || `No se pudo registrar el usuario`,
                    data: response
                }
            }

            return {
                error: true,
                title: 'Error',
                message: `No se pudo obtener las monedas`,
                data: response
            }
        }
    },

    getPrices: async (cryptocurrencyId: number) => {
        let response = null;

        try {
            response = await instanciaAxios.get(`/admin/cryptocurrencies/${cryptocurrencyId}/history`);

            return {
                error: false,
                title: 'Exito',
                message: `Historial de precios obtenido correctamente`,
                data: response.data
            }

        } catch (error) {

            if (error instanceof AxiosError && error.response) {
                return {
                    error: true,
                    title: 'Error',
                    message: error.response.data.error || error.message || `No se pudo obtener el historial de precios`,
                    data: response
                }
            }
            
            return {
                error: true,
                title: 'Error',
                message: `No se pudo obtener el historial de precios`,
                data: response
            }

        }
    }
};
