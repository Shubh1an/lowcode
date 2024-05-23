import apiInstance from './instance';

export const savePage = async (data) => {
  apiInstance
    .post('/form', data)
    .then((res) => {
      return res;
    })
    .catch((err) => {});
};

export const getPages = async (entity_id) => {
  let data = await apiInstance.get('/pages?entity_id=' + entity_id);
  return data;
};

export const editPages = async (id, data) => {
  let response = await apiInstance.put('/pages?id=' + id, data);
  return response;
};

export const createPage = async (data) => {
  let response = await apiInstance.post('/pages', data);
  return response;
};

export const getPageDetails = async (id) => {
  let data = await apiInstance.get('/page_details?page_id=' + id);
  return data;
};

export const createPageDetail = async (data) => {
  let response = await apiInstance.post('/page_details', data);
  return response;
};

export const getPageData = async (id) => {
  let data = await apiInstance.get('/page_data?id=' + id);
  return data;
};

export const getControls = async (id) => {
  let data = await apiInstance.get('/controls?id=' + id);
  return data;
};
export const getAllControls = async (id) => {
  let data = await apiInstance.get('/controls/all');
  return data;
};
