import React from "react";
import { Routes,Route } from "react-router-dom"
import Landing from "./pages/Landign/landing"; 
import Home from "./pages/Home/home";
import Detail from "./pages/Home/detail/detail";
import Form from "./pages/Form/form";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/detail/:id" element={<Detail/>}/>
        <Route path="/form" element={<Form/>}/>
      </Routes>
    </div>
  );
}

export default App;
