import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/home";
import Navbar from "./componenets/Navbar";
import Newsell from './Pages/Newsell';
import Userdeshbord from './Pages/Userdeshbord';
import Products from "./Pages/Products";
import ProductDetail from "./Pages/ProductDetail";

function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* Fixed navbar */}
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sell" element={<Newsell />} />
          <Route path="/deshbord" element={<Userdeshbord/>} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
