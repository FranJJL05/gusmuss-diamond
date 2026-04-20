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

import { useLang } from './context/LanguageContext';

export default function App() {
  const { t } = useLang();

  return (
    <BrowserRouter>
      <Routes>
        {/* Home usa Layout sin title para mostrar solo el logo grande */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="producto/:slug" element={<ProductDetail />} />
          <Route path="carrito" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="login" element={<Login />} />
          <Route path="registro" element={<Register />} />
          <Route path="perfil" element={<Profile />} />
          <Route path="contacto" element={<Contacto />} />
        </Route>

        {/* Colección y Accesorios tienen su propio Navbar con title */}
        <Route path="/coleccion" element={<Layout title={t.nav.ropa} />}>
          <Route index element={<Collection category={null} />} />
        </Route>
        <Route path="/accesorios" element={<Layout title={t.nav.accessories} />}>
          <Route index element={<Collection category="accesorios" pageTitle={t.nav.accessories} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
