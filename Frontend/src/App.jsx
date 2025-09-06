import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/home";
import Navbar from "./componenets/Navbar";
import Newsell from './Pages/Newsell'
import Userdeshbord from './Pages/Userdeshbord'

function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* Fixed navbar */}
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sell" element={<Newsell />} />
          <Route path="/deshbord" element={<Userdeshbord/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
