const { default: apiInstance } = require('./instance');

export const getPageDetails = async (id) => {
  let data = await apiInstance.get('/page_details?page_id=' + id);
  return data;
};
