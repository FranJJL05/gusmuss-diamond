import { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LanguageContext';
import { fetchApi } from '../api';

export default function Profile() {
  const { user, logout, loading: authLoading } = useAuth();
  const { t } = useLang();
  const [pedidos, setPedidos] = useState([]);
  const [loadingPedidos, setLoadingPedidos] = useState(true);

  useEffect(() => {
    if (user) {
      fetchApi('/pedidos')
        .then(setPedidos)
        .catch(console.error)
        .finally(() => setLoadingPedidos(false));
    }
  }, [user]);

  if (authLoading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-8 h-8 border-2 border-gus-gold border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
  if (!user) return <Navigate to="/login" />;

  const handleDownloadInvoice = async (pedidoId) => {
    try {
      const token = localStorage.getItem('jwt_token');
      const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${baseUrl}/api/pedidos/${pedidoId}/pdf`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Error al generar PDF');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `factura_gusmuss_${pedidoId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="px-4 py-6">
      {/* Cabecera perfil */}
      <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="w-14 h-14 bg-gus-black rounded-full flex items-center justify-center text-gus-gold text-xl font-serif">
          {user.nombre?.[0]?.toUpperCase()}
        </div>
        <div>
          <p className="font-serif font-semibold text-gus-black">{user.nombre} {user.apellidos}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Datos personales */}
      <div className="mb-6 space-y-2 text-sm border border-gray-200 rounded p-4">
        <p><span className="font-semibold">Teléfono:</span> {user.telefono || 'No especificado'}</p>
        <p><span className="font-semibold">Dirección:</span> {user.direccion || 'No especificada'}</p>
      </div>

      {/* Historial pedidos */}
      <h2 className="font-serif text-lg text-gus-black mb-4">Mis Pedidos</h2>

      {loadingPedidos ? (
        <div className="flex justify-center py-8">
          <div className="w-6 h-6 border-2 border-gus-gold border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : pedidos.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">Aún no has realizado ningún pedido.</p>
          <Link to="/coleccion" className="mt-4 inline-block bg-gus-black text-white px-6 py-2 rounded-full text-sm font-serif italic hover:bg-gus-gold transition-colors">
            Explorar Colección
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {pedidos.map(pedido => (
            <div key={pedido.id} className="border border-gray-200 rounded p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gus-gold font-semibold text-sm">Pedido #{pedido.id}</span>
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{pedido.estado}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mb-3">
                <span>{pedido.fechaPedido}</span>
                <span className="font-serif font-bold text-gus-black">{pedido.totalFormateado}</span>
              </div>
              <button 
                onClick={() => handleDownloadInvoice(pedido.id)}
                className="w-full text-center border-t border-gray-100 pt-3 text-sm text-gus-black hover:text-gus-gold flex justify-center items-center gap-2 transition-colors"
                title="Imprimir o Descargar copia PDF"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Descargar Factura PDF
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Cerrar sesión */}
      <button
        onClick={logout}
        className="w-full mt-8 border border-gray-300 text-gray-600 py-3 rounded-full text-sm hover:border-red-400 hover:text-red-500 transition-colors"
      >
        {t.nav.logout}
      </button>
    </div>
  );
}
