import React, { useEffect, useState } from 'react';
import GlobalContext from './Context';
import { Category } from '../Components/Template/Category';
import apiInstance from '../Requests/instance';

const GlobalProvider = ({ children }) => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedSubMenu, setSelectedSubMenu] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState([
    { category: 'HR', subCategory: ['HR Manager'] },
    { category: 'Project Manager', subCategory: ['Project Manager'] },
  ]);

  useEffect(() => {
    const requestInterceptor = apiInstance.interceptors.request.use(
      function (config) {
        setIsLoading(true);
        return config;
      },
      function (error) {
        return Promise.reject(error);
      },
    );

    const responseInterceptor = apiInstance.interceptors.response.use(
      function (response) {
        setIsLoading(false);
        return response;
      },
      function (error) {
        return Promise.reject(error);
      },
    );

    return () => {
      apiInstance.interceptors.request.eject(requestInterceptor);
      apiInstance.interceptors.request.eject(responseInterceptor);
    };
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        selectedMenu,
        setSelectedMenu,
        selectedSubMenu,
        setSelectedSubMenu,
        category,
        setCategory,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
