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
      {/* Botones de acción flotantes a la derecha (fuera del prototipo visual, pero necesarios para funcionalidad) */}
      <div className="nav-actions-container">
        {user ? (
          <>
            <span>Hola, {user.nombre}</span>
            <Link to="/perfil">Perfil</Link>
            <button onClick={handleLogout}>Salir</button>
          </>
        ) : (
          <Link to="/login">Entrar / Registrarse</Link>
        )}
        <Link to="/carrito" style={{ position: 'relative' }}>
          Carrito
          {totalItems > 0 && <span style={{ position: 'absolute', top: '-10px', right: '-15px', background: 'red', color: 'white', borderRadius: '50%', padding: '0 5px', fontSize: '0.7rem' }}>{totalItems}</span>}
        </Link>
      </div>

      <div className="nav-top">
        <Link to="/" className="logo-text">Gusmuss</Link>
      </div>
      
      <div className="nav-bottom">
        <nav className="nav-links">
          <Link to="/">INICIO</Link>
          <Link to="/coleccion">ROPA</Link>   {/* Usamos "Ropa" para coincidir con tu diseño, aunque lleve a colección */}
          <Link to="/coleccion">ACCESORIOS</Link>
          <Link to="/contacto">CONTACTO</Link>
        </nav>
      </div>
    </header>
  );
}
