import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LanguageContext';
import { fetchApi } from '../api';

export default function Checkout() {
  const { cartItems, totalItems, subtotalFormatted, clearCart } = useCart();
  const { user, loading: authLoading } = useAuth();
  const { t } = useLang();
  const navigate = useNavigate();

  const [direccionEnvio, setDireccionEnvio] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) navigate('/login?redirect=/checkout');
    if (user?.direccion) setDireccionEnvio(user.direccion);
  }, [user, authLoading]);

  if (authLoading || !user) return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-8 h-8 border-2 border-gus-gold border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (success) return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-8 text-center gap-6">
      <div className="text-6xl">✅</div>
      <h1 className="font-serif text-2xl">¡Pedido Confirmado!</h1>
      <p className="text-gray-600 text-sm">Hemos recibido tu pedido. Recibirás un email de confirmación en breve.</p>
      <Link to="/perfil" className="bg-gus-black text-white px-8 py-3 rounded-full font-serif italic hover:bg-gus-gold transition-colors">
        Ver mis pedidos
      </Link>
    </div>
  );

  if (!cartItems.length) return (
    <div className="flex flex-col items-center justify-center h-[70vh] gap-4">
      <p className="text-gray-500">{t.cart.empty}</p>
      <Link to="/coleccion" className="bg-gus-black text-white px-8 py-3 rounded-full font-serif italic">Ver colección</Link>
    </div>
  );

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!direccionEnvio) { setError('Indica una dirección de envío'); return; }
    setLoading(true);
    setError(null);
    try {
      await fetchApi('/pedidos', {
        method: 'POST',
        body: JSON.stringify({
          items: cartItems.map(i => ({ productId: i.productId, cantidad: i.cantidad })),
          direccionEnvio
        })
      });
      clearCart();
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Error al procesar el pedido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-6">
      <h1 className="font-serif text-2xl text-gus-black mb-6">Finalizar Compra</h1>

      {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded mb-4">{error}</div>}

      {/* Resumen */}
      <div className="bg-gray-50 p-4 rounded mb-6">
        {cartItems.map(item => (
          <div key={item.productId} className="flex justify-between text-sm py-1.5 border-b border-gray-200">
            <span className="font-serif truncate flex-1 mr-2">{item.nombre} x{item.cantidad}</span>
            <span>{new Intl.NumberFormat('es-ES', { style:'currency', currency:'EUR' }).format((item.precioUnitario * item.cantidad)/100)}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold text-base mt-2 pt-2">
          <span>{t.cart.total}</span>
          <span className="text-gus-gold">{subtotalFormatted}</span>
        </div>
      </div>

      <form onSubmit={handleCheckout} className="space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Dirección de Envío</label>
          <textarea
            rows={3} required value={direccionEnvio}
            onChange={e => setDireccionEnvio(e.target.value)}
            placeholder="Calle, número, ciudad, código postal..."
            className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-gus-gold transition-colors"
          />
        </div>

        <div className="bg-gus-gold/10 border border-gus-gold/30 p-4 rounded text-sm text-gray-600">
          <p className="font-semibold text-gus-black mb-1">Pago a contraentrega</p>
          <p>El pago se realizará en el momento de la entrega de forma segura.</p>
        </div>

        <button
          type="submit" disabled={loading}
          className="w-full bg-gus-black text-white py-4 rounded-full font-serif italic text-lg hover:bg-gus-gold transition-colors disabled:opacity-50"
        >
          {loading ? 'Procesando...' : 'Confirmar Pedido'}
        </button>
      </form>
    </div>
  );
}
