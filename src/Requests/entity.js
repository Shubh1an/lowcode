import apiInstance from './instance';

export const getEntities = async (module_id) => {
  let data = await apiInstance.get('/entities?module_id=' + module_id);
  return data;
};

export const saveEntity = async (data) => {
  let response = await apiInstance.post('/entities', data);

  return response;
};
