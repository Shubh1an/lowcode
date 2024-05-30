import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Layout from './layout';

const Authlayout = () => {
  return (
    <div>
      <Routes>
        <Layout>
          <Route path="/auth/home" element={<Home />} />
        </Layout>
      </Routes>
    </div>
  );
};
export default Authlayout;
