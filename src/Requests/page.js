const { default: apiInstance } = require("./instance");

export const getPages = async (entity_id) => {
    let data = await apiInstance.get('/pages?entity_id=' + entity_id);
    return data;
}

export const createPage = async (data) => {
    let response = await apiInstance.post('/pages', data);
    return response;
}