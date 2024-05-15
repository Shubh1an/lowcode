import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import './App.css';
import GlobalContext from './Context/Context';
import GlobalProvider from './Context/Provider';
import Layout from './Layout/Layout';
import Builder from './Pages/Builder';
import Templates from './Pages/Templates';
import List from './Components/Template/List';
import { Category } from './Components/Template/Category';
function App() {
  return (
    <div className="App">
      <GlobalProvider>
        <Layout>
          <Routes>
            <Route path="/builder/*" element={<Builder />} />
            <Route path="/template/*" element={<Templates />} />
          </Routes>
        </Layout>
      </GlobalProvider>
    </div>
  );
}

const Home = () => {
  // @ts-ignore
  const { selectedMenu } = useContext(GlobalContext);
  return selectedMenu?.title === 'Template' ? <Templates /> : <Builder />;
};

export default App;
