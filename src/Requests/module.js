import apiInstance from './instance';

export const getModules = async () => {
  let data = await apiInstance.get('/modules');
  return data;
};

export const saveModule = async (data) => {
  let response = await apiInstance.post('/modules', data);

  return response;
};
