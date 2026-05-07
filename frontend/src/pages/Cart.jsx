import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LanguageContext';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, totalItems, subtotalFormatted } = useCart();
  const { user } = useAuth();
  const { t } = useLang();

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] px-8 gap-4 text-center">
        <div className="text-5xl">🛒</div>
        <h2 className="font-serif text-xl text-gus-black">{t.cart.empty}</h2>
        <Link to="/coleccion" className="bg-gus-black text-white px-8 py-3 rounded-full font-serif italic hover:bg-gus-gold transition-colors">
          {t.cart.browse}
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 bg-white min-h-screen md:min-h-0">
      <h1 className="font-serif text-2xl text-gus-black mb-6">{t.cart.title}</h1>

      <div className="space-y-4 mb-6">
        {cartItems.map(item => {
          const totalItemsOfProduct = cartItems
             .filter(i => i.productId === item.productId)
             .reduce((sum, i) => sum + i.cantidad, 0);

          return (
          <div key={item.cartId} className="flex gap-4 p-3 border border-gray-200 rounded">
            <img
              src={item.imagen || `https://placehold.co/80x100/111/bda57b?text=GD`}
              alt={item.nombre}
              className="w-20 h-24 object-cover rounded"
            />
            <div className="flex-1 min-w-0">
              <p className="font-serif text-sm font-semibold truncate">{item.nombre}</p>
              {item.talla && (
                 <p className="text-xs text-gray-400 mt-0.5 tracking-widest">TALLA: {item.talla}</p>
              )}
              <p className="text-gus-green text-sm mt-1">{item.precioFormateado}</p>

              {/* Cantidad */}
              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => updateQuantity(item.cartId, item.cantidad - 1)}
                  className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-sm hover:border-gus-gold transition-colors"
                >−</button>
                <span className="text-sm">{item.cantidad}</span>
                <button
                  onClick={() => updateQuantity(item.cartId, item.cantidad + 1)}
                  disabled={totalItemsOfProduct >= item.stock}
                  className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-sm hover:border-gus-gold transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >+</button>
              </div>

              <button
                onClick={() => removeFromCart(item.cartId)}
                className="text-xs text-red-400 mt-1 hover:text-red-600 transition-colors"
              >Eliminar</button>
            </div>

            <div className="text-right text-sm font-semibold self-start">
              {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' })
                .format((item.precioUnitario * item.cantidad) / 100)}
            </div>
          </div>
        );
        })}
      </div>

      {/* Resumen */}
      <div className="bg-gray-50 p-4 rounded-lg space-y-2 mb-6">
        <div className="flex justify-between text-sm">
          <span>{t.cart.subtotal} ({totalItems})</span>
          <span>{subtotalFormatted}</span>
        </div>
        <div className="flex justify-between text-sm text-green-600">
          <span>{t.cart.shipping}</span>
          <span>{t.cart.free}</span>
        </div>
        <div className="flex justify-between font-bold text-base border-t border-gray-200 pt-2">
          <span>{t.cart.total}</span>
          <span className="text-gus-gold">{subtotalFormatted}</span>
        </div>
      </div>

      {user ? (
        <Link to="/checkout" className="block w-full text-center bg-gus-black text-white py-4 rounded-full font-serif italic text-lg hover:bg-gus-gold transition-colors">
          {t.cart.checkout}
        </Link>
      ) : (
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-3">{t.cart.loginRequired}</p>
          <Link to="/login?redirect=/carrito" className="block w-full text-center border border-gus-black text-gus-black py-3 rounded-full font-serif italic hover:bg-gus-black hover:text-white transition-colors">
            {t.auth.loginBtn}
          </Link>
        </div>
      )}
    </div>
  );
}
