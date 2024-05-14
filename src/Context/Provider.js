import React, { useState } from 'react';
import GlobalContext from './Context';
import { Category } from '../Components/Template/Category';

const GlobalProvider = ({ children }) => {
   const [selectedMenu, setSelectedMenu] = useState(null);
   const [selectedSubMenu, setSelectedSubMenu] = useState(null);
   const [category, setCategory] = useState([
      { category: 'HR', subCategory: ['HR Manager'] },
      { category: 'Project Manager', subCategory: ['Project Manager'] },
   ]);
   return (
      <GlobalContext.Provider
         value={{
            selectedMenu,
            setSelectedMenu,
            selectedSubMenu,
            setSelectedSubMenu,
            category,
            setCategory,
         }}
      >
         {children}
      </GlobalContext.Provider>
   );
};

export default GlobalProvider;
