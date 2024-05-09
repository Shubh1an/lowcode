import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<div />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
