import apiInstance from './instance';

export const getModules = async () => {
  let data = await apiInstance.get('/modules');
  console.log('module data--->', data);
  return data;
};

export const saveModule = async (data) => {
  let response = await apiInstance.post('/modules', data);
  console.log('save data module---->', response);
  return response;
};
