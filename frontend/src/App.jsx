import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Pages
import Home from './pages/Home';
import Collection from './pages/Collection';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import Contacto from './pages/Contacto';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="coleccion" element={<Collection />} />
          <Route path="producto/:slug" element={<ProductDetail />} />
          <Route path="contacto" element={<Contacto />} />
          
          <Route path="carrito" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          
          <Route path="login" element={<Login />} />
          <Route path="registro" element={<Register />} />
          <Route path="perfil" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
