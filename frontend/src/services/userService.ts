import { instanciaAxios } from "./axios";

export const getUsers = async () => {

    let response = null;

    try {
        response = await instanciaAxios.get('/users');

        if (response.status == 200) {
            return {
                error: false,
                title: 'Exito',
                message: `Se cargaron ${response.data} usuarios`,
                data: response
            }
        }

    } catch (error) {

        return {
            error: true,
            title: 'Error',
            message: `No se pudo cargar los usuarios`,
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

export const postFarmersUsersHarvestsFromCSV = async (data: any) => {

    let response = null;

    try {
        response = await instanciaAxios.post(
            "users/farmers/upload",
            { users_csv: data },
            { headers: { 'Content-Type': 'multipart/form-data' } }
        )

        if (response.status === 200) {
            return {
                error: false,
                title: 'Subida exitosa',
                message: `Se cargaron ${response.data.length} nuevos agricultores`,
                data: response
            }
        }
    } catch (error) {
        return {
            error: true,
            title: 'Error',
            message: 'Archivo incorrecto',
            data: response
        }
    }

    return {
        error: true,
        title: 'Error Fatal',
        message: 'Fue imposible procesar la solicitud',
        data: response
    }
}

export const postCompaniesUsersHarvestsFromCSV = async (data: any) => {

    let response = null;

    try {
        response = await instanciaAxios.post(
            "users/companies/upload",
            { users_csv: data },
            { headers: { 'Content-Type': 'multipart/form-data' } }
        )

        if (response.status === 200) {
            return {
                error: false,
                title: 'Subida exitosa',
                message: `Se cargaron ${response.data.length} nuevos negocios`,
                data: response
            }
        }
    } catch (error) {
        return {
            error: true,
            title: 'Error',
            message: 'Archivo incorrecto',
            data: response
        }
    }

    return {
        error: true,
        title: 'Error Fatal',
        message: 'Fue imposible procesar la solicitud',
        data: response
    }
}
