import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import CustomTopLoader from './Components/Loader/CustomTopLoader';
import GlobalProvider from './Context/Provider';
import Layout from './Layout/Layout';
import Kanban from './Pages/Board/Kanban';
import Templates from './Pages/Templates';
import Builder from './Screens/Builder';
import ClientLayout from './client/ClientLayout';
import Dashboard from './client/Dashboard';
import Raw from './client/pages/Raw';
import Lead from './client/pages/Lead';
import Deal from './client/pages/Deal';

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
              path="/*"
              element={
                <ClientLayout>
                  {
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/page/raw" element={<Raw />} />
                      <Route path="/page/lead" element={<Lead />} />
                      <Route path="/page/deal" element={<Deal />} />
                    </Routes>
                  }
                </ClientLayout>
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
