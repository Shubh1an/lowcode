import * as Yup from 'yup';
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,16})/;

export const initialValues = { email: '' };

export const initialLoginValues = {
  email: '',
  password: '',
};

export const validationSchema = Yup.object({
  email: Yup.string().required('Required'),
});
export const validationLoginSchema = Yup.object({
  email: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
  //.matches(passwordRegex , "enter valid passowrd"),
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
