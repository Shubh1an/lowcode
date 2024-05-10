import "./App.css";
import {Route,Routes  } from 'react-router-dom';
import Layout from "./Layout/Layout";
import Builder from "./Pages/Builder";
import Board from "./Pages/Board/Board";
function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Board" element={<Board />} />
      
        </Routes>
      </Layout>
    </div>
  );
}

const Home = () => {
  return (
    <Builder />
  )
}

export default App;
