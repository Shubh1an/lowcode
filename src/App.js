import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Builder from "./Pages/Builder";
import GlobalProvider from "./Context/Provider";
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
  return (
    <Builder />
  )
}

export default App;
