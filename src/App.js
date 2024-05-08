import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Modules from "./Module";
import Entity from "./Entity";
import FormBuilder from "./Form";
import FillForm from "./FormFill";
import ViewFormData from "./ViewForm";
import Layout from "./Layout/Layout";
function App() {
  return (
    <div className="App">
       <Layout> 
    </Layout>
      {/* <BrowserRouter>
        <Routes>
        <Route path="" element={<Modules />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/entity" element={<Entity />} />
          <Route path="/form" element={<FormBuilder />} />
          <Route path="/fill-form" element={<FillForm />} />
          <Route path="/view-form" element={<ViewFormData />} />
        </Routes>
      </BrowserRouter> */}
    </div>
  );
}

export default App;
