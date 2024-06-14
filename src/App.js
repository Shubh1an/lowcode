import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import CustomTopLoader from './Components/Loader/CustomTopLoader';
import Login from './Components/SetupWizard/Login';
import SetupLayout from './Components/SetupWizard/SetupLayout';
import GlobalProvider from './Context/Provider';
import Layout from './Layout/Layout';
import Kanban from './Pages/Board/Kanban';
import Templates from './Pages/Templates';
import Builder from './Screens/Builder';
import { Route, Routes } from 'react-router-dom';
// @ts-ignore
import Profile from './Pages/Profile';

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
            <Route
              path="/profile"
              element={
                <LayoutChild>
                  <Profile />
                </LayoutChild>
              }
            />
            {/* <Route
              path="/*"
              element={<SetupLayout> {<Login />} </SetupLayout>}
            /> */}
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
