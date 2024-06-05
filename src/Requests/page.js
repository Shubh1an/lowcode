const { default: apiInstance } = require('./instance');

export const getPages = async (entity_id) => {
  console.log("fetching for entity", entity_id);
  let data = await apiInstance.get('/pages?entity_id=' + entity_id);
  return data;
};

export const getPageDetails = async (page_id) => {
  let data = await apiInstance.get('/pages/page?id=' + page_id);
  return data;
};
export const createPage = async (data) => {
  let response = await apiInstance.post('/pages', data);
  return response;
};

export const updatePage = async (page_id, data) => {
  let response = await apiInstance.put('/pages?id=' + page_id, data);
  return response;
};
