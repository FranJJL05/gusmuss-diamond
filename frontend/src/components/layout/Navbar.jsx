import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Layout.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="container nav-container">
        <div className="nav-brand">
          <Link to="/">
            <span className="serif gold">GUSMUSS</span> DIAMOND
          </Link>
        </div>

        <nav className="nav-links hide-mobile">
          <Link to="/">Inicio</Link>
          <Link to="/coleccion">Colección</Link>
        </nav>

        <div className="nav-actions">
          {user ? (
            <div className="nav-user">
              <span className="hide-mobile">Hola, {user.nombre}</span>
              <Link to="/perfil" className="badge badge-gold">Perfil</Link>
              <button onClick={handleLogout} className="btn-text">Salir</button>
            </div>
          ) : (
            <div className="nav-guest">
              <Link to="/login" className="btn-text">Entrar</Link>
            </div>
          )}
          
          <Link to="/carrito" className="cart-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
}
