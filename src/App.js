import React, { useEffect, useState } from 'react';
import './App.css';
import GlobalProvider from './Context/Provider';
import Layout from './Layout/Layout';
import Builder from './Pages/Builder';
import Templates from './Pages/Templates';
import { Navigate, Route, Routes } from 'react-router-dom';
import Kanban from './Pages/Board/Kanban';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CustomTopLoader from './Components/Loader/CustomTopLoader';
import SetupLayout from './Components/SetupWizard/SetupLayout';
import Login from './Components/SetupWizard/Login';
import SignUp from './Components/SetupWizard/SignUp';
import PersonalInfo from './Components/SetupWizard/PersonalInfo';
import Industry from './Components/SetupWizard/Industry';
import Role from './Components/SetupWizard/Role';

function App() {
  const [stepUpImg, setUpImg] = useState([]);

  useEffect(() => {
    console.log('object', stepUpImg);
  }, [stepUpImg]);

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
          <Route
            path="/setup/*"
            element={
              <SetupLayout stepUpImg={stepUpImg}>
                {' '}
                {
                  <Routes>
                    <Route path="/" element={<SignUp setUpImg={setUpImg} />} />
                    <Route
                      path="signin"
                      element={<Login setUpImg={setUpImg} />}
                    />
                    <Route
                      path="account"
                      element={<PersonalInfo setUpImg={setUpImg} />}
                    />
                    <Route
                      path="industry"
                      element={<Industry setUpImg={setUpImg} />}
                    />
                    <Route path="role" element={<Role setUpImg={setUpImg} />} />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                }{' '}
              </SetupLayout>
            }
          />
        </Routes>
      </GlobalProvider>
    </div>
  );
}

const LayoutChild = ({ children }) => {
  return <Layout>{children}</Layout>;
  return <Layout>{children}</Layout>;
};

export default App;
