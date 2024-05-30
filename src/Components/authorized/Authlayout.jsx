import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Layout from './Layout';

const Authlayout = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/auth/home"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
      </Routes>
    </div>
  );
};
export default Authlayout;
