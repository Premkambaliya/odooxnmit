import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/home";
import Navbar from "./componenets/Navbar";
import Newsell from './Pages/Newsell'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sell" element={<Newsell />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
