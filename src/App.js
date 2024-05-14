import "./App.css";
import {Route,Routes  } from 'react-router-dom';
import Layout from "./Layout/Layout";
import Builder from "./Pages/Builder";
import Board from "./Pages/Board/Board";
import GlobalProvider from "./Context/Provider";
import { useContext } from "react";
import GlobalContext from "./Context/Context";
import Templates from "./Pages/Templates";
function App() {
  return (
    <div className="App">
      <GlobalProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
          <Route path="/Board" element={<Board />} />
      
          </Routes>
        </Layout>
      </GlobalProvider>
    </div>
  );
}

const Home = () => {
  const { selectedMenu } = useContext(GlobalContext)
  return selectedMenu?.title === 'Template' ? <Templates /> : <Builder /> 
}

export default App;
