import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  Products,
  SingleProduct,
  About,
  Cart,
  Checkout,
  Error,
  PrivateRoute
} from './pages'

import { Navbar, Sidebar, Footer } from "./components";

function App() {
  return (
    <Router>
      <Navbar/>
      <Sidebar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/products/:id" element={<SingleProduct/>} />

        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/cart" element={<Cart/>} />

        <Route path="/about" element={<About/>} />
        <Route path="*" element={<Error/>} />
      </Routes>
      <Footer/>
    </Router>
    
  );
}

export default App;
