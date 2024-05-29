import { useContext } from 'react';
import React from 'react';
import './App.css';
import GlobalContext from './Context/Context';
import GlobalProvider from './Context/Provider';
import Layout from './Layout/Layout';
import Builder from './Pages/Builder';
import Templates from './Pages/Templates';
import { Route, Routes } from 'react-router-dom';
import Kanban from './Pages/Board/Kanban';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CustomTopLoader from './Components/Loader/CustomTopLoader';
import SetupLayout from './Components/SetupWizard/SetupLayout';
import Login from './Components/SetupWizard/Login';

function App() {
  // dfdsfsdfdfsd
  return (
    <div className="App">
      <GlobalProvider>
        <CustomTopLoader />

        <Routes>
          <Route
            path="/builder/*"
            element={
              <LayoutChild>
                <Builder />
              </LayoutChild>
            }
          />
          <Route
            path="/template/*"
            element={
              <LayoutChild>
                <Templates />
              </LayoutChild>
            }
          />
          <Route
            path="/kanban"
            element={
              <LayoutChild>
                <DndProvider backend={HTML5Backend}>
                  <Kanban />
                </DndProvider>
              </LayoutChild>
            }
          />
          <Route path="/*" element={<SetupLayout> {<Login />} </SetupLayout>} />
        </Routes>
      </GlobalProvider>
    </div>
  );
}

const LayoutChild = ({ children }) => {
  return <Layout>{children}</Layout>;
};

export default App;
