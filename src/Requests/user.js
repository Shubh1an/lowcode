import apiInstance from './instance';

export const getIndustry = async () => {
  let data = await apiInstance.get('/industry');
  return data;
};

export const getBusinessmodel = async () => {
  let data = await apiInstance.get('/businessmodel');
  return data;
};

export const Role = async () => {
  let data = await apiInstance.get('/role');
  return data;
};
