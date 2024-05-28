import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import CustomTopLoader from './Components/Loader/CustomTopLoader';
import Baselayout from './Components/SetupWizard/Baselayout';
import SetupLayout from './Components/SetupWizard/SetupLayout';
import GlobalProvider from './Context/Provider';
import Layout from './Layout/Layout';
import Kanban from './Pages/Board/Kanban';
import Builder from './Pages/Builder';
import Templates from './Pages/Templates';

function App() {
  const [stepUpImg, setUpImg] = useState([]);
  return (
    <div className="App">
      <GlobalProvider>
        <CustomTopLoader />

        <Routes>
          {/* <Route path="/"  /> */}
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
            path="/*"
            element={
              <SetupLayout stepUpImg={stepUpImg}>
                <Baselayout setUpImg={setUpImg} />
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
};

export default App;
