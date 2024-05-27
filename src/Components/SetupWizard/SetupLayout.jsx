import React from 'react';
import { BackgroundsetupImg } from '../../svg';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

const SetupLayout = ({ children, stepUpImg }) => {
  // Validation schema using Yup
  const validationSchema = Yup.object({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
  });
  return (
    <div className="w-full h-[100vh] bg-[#FCF9EE] flex flex-row">
      <div className="flex">
        <div className="w-[100%] flex justify-center items-center">
          {stepUpImg}
        </div>
      </div>
      <div className="w-1/2 h-full flex justify-center items-center">
        <Formik
          initialValues={{ firstName: '', lastName: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            console.log(values);
            actions.setSubmitting(false);
          }}
        >
          {(formikProps) => <Form>{children}</Form>}
        </Formik>
      </div>
    </div>
  );
};

export default SetupLayout;
