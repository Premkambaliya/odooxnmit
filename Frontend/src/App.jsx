import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./Pages/Home/home";
import Navbar from "./componenets/Navbar";
import Newsell from './Pages/Newsell';
import Userdashboard from './Pages/Userdashboard';
import Products from "./Pages/Products";
import ProductDetail from "./Pages/ProductDetail";
import Cart from "./Pages/Cart";   // <-- Add this import
import ItemsPage from "./Pages/ItemsPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* Fixed navbar */}
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sell" element={<Newsell />} />
          <Route path="/dashboard" element={<Userdashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} /> 
          <Route path="/my-items" element={<ItemsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
