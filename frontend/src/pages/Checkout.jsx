import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { fetchApi } from '../api';

export default function Checkout() {
  const { cartItems, totalItems, subtotalFormatted, clearCart } = useCart();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [direccionEnvio, setDireccionEnvio] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login?redirect=/checkout');
    }
    if (user?.direccion) {
      setDireccionEnvio(user.direccion);
    }
  }, [user, authLoading, navigate]);

  if (authLoading || !user) return <div className="spinner-wrap"><div className="spinner"></div></div>;

  if (success) {
    return (
      <div className="container section text-center" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 className="serif gold mb-4">¡Pedido Confirmado!</h1>
        <p className="mb-4">Gracias por su confianza. Hemos recibido su pedido y comenzaremos a prepararlo inmediatamente. Recibirá un email con los detalles del envío.</p>
        <Link to="/perfil" className="btn btn-gold">Ver Mis Pedidos</Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container section text-center">
        <h2 className="serif mb-4">No hay artículos para comprar</h2>
        <Link to="/coleccion" className="btn btn-gold">Ir a la tienda</Link>
      </div>
    );
  }

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!direccionEnvio) {
      setError('Por favor, indica una dirección de envío');
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      const resp = await fetchApi('/pedidos', {
        method: 'POST',
        body: JSON.stringify({
          items: cartItems.map(i => ({ productId: i.productId, cantidad: i.cantidad })),
          direccionEnvio
        })
      });
      // Checkout exitoso
      clearCart();
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Error al procesar el pedido. Inténtelo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container section cart-page">
      <h1 className="serif gold mb-4">Finalizar Compra</h1>
      
      <div className="cart-grid">
        {/* Formulario */}
        <div className="checkout-form">
          <h3 className="serif mb-4">Datos de Envío Asegurado</h3>
          
          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleCheckout}>
            <div className="form-group">
              <label className="form-label">Nombre del Destinatario</label>
              <input type="text" className="form-input" disabled value={`${user.nombre} ${user.apellidos}`} />
            </div>
            
            <div className="form-group">
              <label className="form-label">Email de Confirmación</label>
              <input type="text" className="form-input" disabled value={user.email} />
            </div>

            <div className="form-group">
              <label className="form-label">Dirección Completa de Envío</label>
              <textarea 
                className="form-input" 
                rows="3" 
                required
                value={direccionEnvio}
                onChange={(e) => setDireccionEnvio(e.target.value)}
                placeholder="Calle, Número, Piso, Ciudad, Código Postal..."
              ></textarea>
            </div>

            <div className="mt-4 p-4" style={{background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.2)'}}>
              <h4 className="serif gold mb-2">Pago a Contrareembolso</h4>
              <p className="text-gray" style={{fontSize: '0.85rem'}}>Para su seguridad y máxima confidencialidad, el pago se realizará de forma segura en el momento de la entrega de su pieza, mediante transferencia instantánea o tarjeta al transportista blindado.</p>
            </div>

            <button type="submit" className="btn btn-gold w-100 mt-4" disabled={loading}>
              {loading ? 'Procesando Pedido...' : 'Confirmar Pedido'}
            </button>
          </form>
        </div>

        {/* Resumen del Pedido */}
        <div className="cart-summary">
          <h3 className="serif mb-4">Su Pedido</h3>
          <div style={{maxHeight: '300px', overflowY: 'auto', marginBottom: '1.5rem'}}>
            {cartItems.map(item => (
              <div key={item.productId} style={{display: 'flex', gap: '1rem', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)'}}>
                <img src={item.imagen} alt="" style={{width: '60px', height: '60px', objectFit: 'cover'}} />
                <div>
                  <div className="serif">{item.nombre}</div>
                  <div className="text-gray" style={{fontSize: '0.8rem'}}>x{item.cantidad} — {item.precioFormateado}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="summary-row">
            <span>Subtotal ({totalItems} piezas)</span>
            <span>{subtotalFormatted}</span>
          </div>
          <div className="summary-row">
            <span>Envío Blindado</span>
            <span className="text-success">Gratuito</span>
          </div>
          <div className="summary-total mt-4">
            <span>Total a Pagar</span>
            <span className="gold">{subtotalFormatted}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
