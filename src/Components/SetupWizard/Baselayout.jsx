import React from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import SignUp from './SignUp';
import Login from './Login';
import PersonalInfo from './PersonalInfo';
import Industry from './Industry';
import Role from './Role';
import { Formik } from 'formik';
import {
  initialLoginValues,
  initialValues,
  initialValues1,
  validationLoginSchema,
  validationSchema,
  validationSchema1,
} from './formvalue';
import { useDispatch } from 'react-redux';
import { setuserOrg, userdetail } from '../../redux/userslice';
import Business from './Business';
import Appmodel from './Appmodel';
import Invite from './Invite';
import { userLogin } from '../../Requests/user';

export default function Baselayout({ setUpImg }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div>
      <Routes>
        <Route
          path="signin"
          element={
            <Formik
              initialValues={initialLoginValues}
              validationSchema={validationLoginSchema}
              onSubmit={(values) => {
                userLogin({ values }).then((res) => {
                  if (res.status) {
                    if (res.data.data != false) {
                      localStorage.setItem('token', res.data.data);
                      alert(res.data.message);
                      navigate('../auth/home');
                    } else {
                      alert(res.data.message);
                      navigate('/signin');
                    }
                  } else {
                    alert(res.data.message);
                    navigate('/signin');
                  }
                });
              }}
            >
              {(formikProps) => (
                <Login setUpImg={setUpImg} formikProps={formikProps} />
              )}
            </Formik>
          }
        />
        <Route
          path="/"
          element={
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                dispatch(userdetail(values.email));
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
                dispatch(setuserOrg(values));
                navigate(`/industry`);
              }}
            >
              {(formikProps) => (
                <PersonalInfo setUpImg={setUpImg} formikProps={formikProps} />
              )}
            </Formik>
          }
        />
        <Route path="industry" element={<Industry setUpImg={setUpImg} />} />
        <Route path="role" element={<Role setUpImg={setUpImg} />} />
        <Route
          path="companymember"
          element={<Business setUpImg={setUpImg} />}
        />
        <Route path="apps" element={<Appmodel setUpImg={setUpImg} />} />
        <Route path="invitemember" element={<Invite setUpImg={setUpImg} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
