import * as Yup from 'yup';

export const initialValues = { email: '' };

export const validationSchema = Yup.object({
  email: Yup.string().required('Required'),
});

export const initialValues1 = {
  fullname: '',
  password: '',
  companyname: '',
};

export const validationSchema1 = Yup.object({
  fullname: Yup.string().required('Required'),
  password: Yup.string().required('Password is required'),
  companyname: Yup.string().required('Required'),
});

export const initialValues2 = {
  Industry: '',
  // BusisnessModel:"",
};

export const validationSchema2 = Yup.object({});
