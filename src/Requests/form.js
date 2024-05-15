import apiInstance from './instance';

export const saveForm = async (data) => {
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

export const getForms = async () => {
  let data = await apiInstance.get('/form/all');
  return data;
};
