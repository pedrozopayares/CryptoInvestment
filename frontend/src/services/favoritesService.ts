import { instanciaAxios } from "./axios";
import { AxiosError } from "axios";

export const favoritesService = {
    getFavorites: async () => {
        let response = null;

        try {
            response = await instanciaAxios.get('/admin/favorites');

            return {
                error: false,
                title: 'Exito',
                message: `Favoritos obtenidos correctamente`,
                data: response.data
            }

        } catch (error) {

            if (error instanceof AxiosError && error.response) {
                return {
                    error: true,
                    title: 'Error',
                    message: error.response.data.error || error.message || `No se pudo obtener los favoritos`,
                    data: response
                }
            }

            return {
                error: true,
                title: 'Error',
                message: `No se pudo obtener los favoritos`,
                data: response
            }
        }
    },

    getFavoritesWithHistory: async () => {
        let response = null;

        try {
            response = await instanciaAxios.get('/admin/favorites/history');

            return {
                error: false,
                title: 'Exito',
                message: `Favoritos obtenidos correctamente`,
                data: response.data
            }

        } catch (error) {

            if (error instanceof AxiosError && error.response) {
                return {
                    error: true,
                    title: 'Error',
                    message: error.response.data.error || error.message || `No se pudo obtener los favoritos`,
                    data: response
                }
            }

            return {
                error: true,
                title: 'Error',
                message: `No se pudo obtener los favoritos`,
                data: response
            }
        }
    },

    addFavorite: async (cryptocurrencyId: number) => {
        let response = null;

        try {
            response = await instanciaAxios.post(`/admin/favorites`, { cryptocurrencyId });

            return {
                error: false,
                title: 'Exito',
                message: `Criptomoneda añadida a favoritos correctamente`,
                data: response.data
            }

        } catch (error) {

            if (error instanceof AxiosError && error.response) {
                return {
                    error: true,
                    title: 'Error',
                    message: error.response.data.error || error.message || `No se pudo añadir la criptomoneda a favoritos`,
                    data: response
                }
            }
            
            return {
                error: true,
                title: 'Error',
                message: `No se pudo añadir la criptomoneda a favoritos`,
                data: response
            }

        }
    },

    removeFavorite: async (cryptocurrencyId: number) => {
        let response = null;

        try {
            response = await instanciaAxios.delete(`/admin/favorites/${cryptocurrencyId}`);

            return {
                error: false,
                title: 'Exito',
                message: `Criptomoneda eliminada de favoritos correctamente`,
                data: response.data
            }

        } catch (error) {

            if (error instanceof AxiosError && error.response) {
                return {
                    error: true,
                    title: 'Error',
                    message: error.response.data.error || error.message || `No se pudo eliminar la criptomoneda de favoritos`,
                    data: response
                }
            }
            
            return {
                error: true,
                title: 'Error',
                message: `No se pudo eliminar la criptomoneda de favoritos`,
                data: response
            }

        }
    }
};
