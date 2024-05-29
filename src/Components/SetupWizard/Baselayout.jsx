import React from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import { Formik } from 'formik';
import {
  initialValues,
  initialValues1,
  initialValues2,
  validationSchema,
  validationSchema1,
  validationSchema2,
} from './formvalue';
import SignUp from './SignUp';
import Login from './Login';
import PersonalInfo from './PersonalInfo';
import Industry from './Industry';
import Role from './Role';

export default function Baselayout({ setUpImg }) {
  const navigate = useNavigate();
  return (
    <div>
      <Routes>
        <Route path="signin" element={<Login setUpImg={setUpImg} />} />
        <Route
          path="/"
          element={
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log('signup', values);
                navigate(`/account`);
              }}
            >
              {(formikProps) => (
                <SignUp setUpImg={setUpImg} formikProps={formikProps} />
              )}
            </Formik>
          }
        />

        <Route
          path="account"
          element={
            <Formik
              initialValues={initialValues1}
              validationSchema={validationSchema1}
              onSubmit={(values) => {
                console.log('account ', values);
                navigate(`/industry`);
              }}
            >
              {(formikProps) => (
                <PersonalInfo setUpImg={setUpImg} formikProps={formikProps} />
              )}
            </Formik>
          }
        />
        <Route
          path="industry"
          element={
            <Formik
              initialValues={initialValues2}
              validationSchema={validationSchema2}
              onSubmit={(values) => {
                console.log('account ', values);
                navigate(`/industry`);
              }}
            >
              {(formikProps) => (
                <Industry setUpImg={setUpImg} formikProps={formikProps} />
              )}
            </Formik>
          }
        />
        <Route path="role" element={<Role setUpImg={setUpImg} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
