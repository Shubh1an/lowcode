import { useContext } from 'react';
import React from 'react';
import './App.css';
import GlobalContext from './Context/Context';
import GlobalProvider from './Context/Provider';
import Layout from './Layout/Layout';
import Builder from './Pages/Builder';
import Board from './Pages/Board/Board';
import Templates from './Pages/Templates';
import { Route, Routes } from 'react-router-dom';
import Kanban from './Pages/Board/Kanban';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <div className="App">
      <GlobalProvider>
        <Layout>
          <Routes>
            <Route path="/builder/*" element={<Builder />} />
            <Route path="/template/*" element={<Templates />} />
            <Route path="/board" element={<Board />} />
            <Route
              path="/kanban"
              element={
                <DndProvider backend={HTML5Backend}>
                  <Kanban />
                </DndProvider>
              }
            />
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
