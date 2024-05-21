const { default: apiInstance } = require("./instance");

export const savePageData = async (data) => {
    let response = await apiInstance.post('/page_data', data);

    return response;
};

export const getPageData = async (id) => {
    let data = await apiInstance.get('/page_data?id=' + id);
    return data;
}

export const editPageData = async (id, data) => {
    let response = await apiInstance.put(`/page_data?id=${id}`, data);
    return response;
}