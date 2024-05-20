import apiInstance from './instance';

export const getEntities = async (module_id) => {
    let data = await apiInstance.get('/entity?module_id=' + module_id);
    return data;
}

export const saveEntity = async (data) => {
  let response = await apiInstance.post('/entity', data);

  return response;
};
