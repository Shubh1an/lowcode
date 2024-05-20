import apiInstance from './instance';

export const savePage = async (data) => {
  console.log(data);
  apiInstance
    .post('/form', data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getPages = async (entity_id) => {
  let data = await apiInstance.get('/pages?entity_id=' + entity_id);
  return data;
};

export const getPageDetails = async (id) => {
  let data = await apiInstance.get('/page_details?page_id=' + id);
  return data;
}

export const getPageData = async (id) => {
  let data = await apiInstance.get('/page_data?id=' + id);
  return data;
}


export const getControls = async (id) => {
  let data = await apiInstance.get('/controls?id=' + id);
  return data;
}