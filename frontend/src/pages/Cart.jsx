import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Cart.css';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, totalItems, subtotalFormatted } = useCart();
  const { user } = useAuth();

  if (cartItems.length === 0) {
    return (
      <div className="container section empty-state">
        <h2 className="serif gold mb-4">Su Carrito está vacío</h2>
        <p className="mb-4">No ha añadido ninguna pieza a su colección personal aún.</p>
        <Link to="/coleccion" className="btn btn-gold">Explorar Colección</Link>
      </div>
    );
  }

  return (
    <div className="container section cart-page">
      <h1 className="serif gold mb-4">Su Colección</h1>
      
      <div className="cart-grid">
        <div className="cart-items">
          <div className="cart-header hide-mobile">
            <span>Pieza</span>
            <span>Cantidad</span>
            <span>Total</span>
          </div>
          
          {cartItems.map(item => (
            <div key={item.productId} className="cart-row">
              <div className="cart-item-info">
                <Link to={`/producto/${item.slug}`} className="cart-item-img-wrap">
                  {item.imagen ? (
                    <img src={item.imagen} alt={item.nombre} />
                  ) : (
                    <div className="cart-placeholder">GD</div>
                  )}
                </Link>
                <div>
                  <Link to={`/producto/${item.slug}`} className="cart-item-name">{item.nombre}</Link>
                  <div className="cart-item-price">{item.precioFormateado}</div>
                  <button onClick={() => removeFromCart(item.productId)} className="btn-text text-error mt-2" style={{fontSize: '0.8rem'}}>Eliminar</button>
                </div>
              </div>
              
              <div className="cart-qty">
                <button onClick={() => updateQuantity(item.productId, item.cantidad - 1)}>-</button>
                <span>{item.cantidad}</span>
                <button onClick={() => updateQuantity(item.productId, item.cantidad + 1)}>+</button>
              </div>
              
              <div className="cart-item-total">
                {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format((item.precioUnitario * item.cantidad) / 100)}
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3 className="serif mb-4">Resumen</h3>
          <div className="summary-row">
            <span>Subtotal ({totalItems} piezas)</span>
            <span>{subtotalFormatted}</span>
          </div>
          <div className="summary-row">
            <span>Envío Asegurado</span>
            <span className="text-success">Gratuito</span>
          </div>
          <div className="summary-total mt-4">
            <span>Total</span>
            <span className="gold">{subtotalFormatted}</span>
          </div>
          
          <div className="mt-4">
            {user ? (
              <Link to="/checkout" className="btn btn-gold w-100">Finalizar Compra</Link>
            ) : (
              <div className="auth-prompt">
                <p className="text-gray mb-2" style={{fontSize: '0.85rem'}}>Debe iniciar sesión para finalizar su compra.</p>
                <Link to="/login?redirect=/carrito" className="btn btn-outline w-100">Iniciar Sesión</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
