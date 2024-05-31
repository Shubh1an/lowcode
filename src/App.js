import { useContext } from 'react';
import React from 'react';
import './App.css';
import GlobalProvider from './Context/Provider';
import Layout from './Layout/Layout';
import Templates from './Pages/Templates';
import { Route, Routes } from 'react-router-dom';
import Kanban from './Pages/Board/Kanban';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CustomTopLoader from './Components/Loader/CustomTopLoader';
import SetupLayout from './Components/SetupWizard/SetupLayout';
import Login from './Components/SetupWizard/Login';
import Modules from './Screens/Modules';
import Builder from './Screens/Builder';

function App() {
  // dfdsfsdfdfsd
  return (
    <div className="App">
      <GlobalProvider>
        <DndProvider backend={HTML5Backend}>
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
                    <Kanban />
                </LayoutChild>
              }
            />
            <Route path="/*" element={<SetupLayout> {<Login />} </SetupLayout>} />
          </Routes>
        </DndProvider>
      </GlobalProvider>
    </div>
  );
}

const LayoutChild = ({ children }) => {
  return <Layout>{children}</Layout>;
};

export default App;

/* pipeline */
