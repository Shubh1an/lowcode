import apiInstance from './instance';


export const getModules = async () => {
    let data = await apiInstance.get('/module');
    return data;
}

export const saveModule = async (data) => {
    let response = await apiInstance
        .post('/module', data)

    return response
}
