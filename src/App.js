import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import CustomTopLoader from './Components/Loader/CustomTopLoader';
import GlobalProvider from './Context/Provider';
import Layout from './Layout/Layout';
import Kanban from './Pages/Board/Kanban';
import Templates from './Pages/Templates';
import Builder from './Screens/Builder';
import NavigationComponents from './Screens/Components/LandingPageComponents/NavigationComponents';
import ClientLayout from './client/ClientLayout';
import Dashboard from './client/Dashboard';
import Deal from './client/pages/Deal';
import Lead from './client/pages/Lead';
import Pipelineview from './client/pages/Pipelineview';
import Raw from './client/pages/Raw';
import { moduleselected } from './client/service/service';
function App() {
  const dispatch = useDispatch();
  const [modules, setmoules] = useState();
  const [entity, setentity] = useState([]);
  const modulesdata = useSelector((state) => state['modules']);

  useEffect(() => {
    moduleselected(dispatch, modulesdata?.permissionapp);
    let modulename = modulesdata?.module.find(
      (em) => em.name === modulesdata?.permissionapp,
    );
    if (modulename) {
      setmoules(modulename);
    }
  }, [entity]);

  return (
    <div className="App">
      <GlobalProvider>
        <DndProvider backend={HTML5Backend}>
          <CustomTopLoader />
          <Routes>
            <Route
              path="/builder/"
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
            <Route path="/landingPage/*" element={<NavigationComponents />} />
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
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/page/pipeline" element={<Raw />} />
                      <Route
                        path="/page/contactview"
                        element={<Pipelineview />}
                      />
                      <Route path="/page/contact" element={<Lead />} />
                      <Route path="/page/activity" element={<Deal />} />
                    </Routes>
                  }
                </ClientLayout>
              }
            />
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
