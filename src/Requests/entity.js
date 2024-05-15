import apiInstance from "./instance";

export const getEntities = async () => {
    let data = await apiInstance.get('/entity');
    return data;
}

export const saveEntity = async (data) => {
    let response = await apiInstance
        .post('/entity', data)

    return response
}