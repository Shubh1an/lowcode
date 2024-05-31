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

export const Createuser = async (payload) => {
  let data = await apiInstance.post('/user', payload);
  return data;
};
export const Createcompany = async (payload) => {
  let data = await apiInstance.post('/company', payload);
  return data;
};

export const userLogin = async (payload) => {
  let data = await apiInstance.post('/user/login', payload);
  return data;
};
