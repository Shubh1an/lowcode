const { default: apiInstance } = require("./instance");

export const fillData = async (data) => {
    let response = await apiInstance.post('/filledData', data);
    return response;
}

export const getFillData = async (id) => {
    let response = await apiInstance.get('/filledData?id=' + id);
    return response;
}

