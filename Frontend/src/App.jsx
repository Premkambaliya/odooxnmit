import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/home";
import Navbar from "./componenets/Navbar";
function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
     <Route path="/" element={<Home/>}/>
     </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
