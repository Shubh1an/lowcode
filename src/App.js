import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Builder from "./Pages/Builder";
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
