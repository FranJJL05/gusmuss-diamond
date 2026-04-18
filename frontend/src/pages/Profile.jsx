import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchApi } from '../api';

export default function Profile() {
  const { user, loading: authLoading } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [loadingPedidos, setLoadingPedidos] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchApi('/pedidos')
        .then(data => setPedidos(data))
        .catch(err => setError('No se pudieron cargar los pedidos'))
        .finally(() => setLoadingPedidos(false));
    }
  }, [user]);

  if (authLoading) return <div className="spinner-wrap"><div className="spinner"></div></div>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="container section">
      <h1 className="serif gold mb-4">Mi Perfil</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem' }}>
        {/* Datos del usuario */}
        <div className="card" style={{ padding: '2rem', height: 'fit-content' }}>
          <h3 className="serif mb-4">Mis Datos</h3>
          <p className="mb-2"><strong>Nombre:</strong> {user.nombre} {user.apellidos}</p>
          <p className="mb-2"><strong>Email:</strong> {user.email}</p>
          <p className="mb-2"><strong>Teléfono:</strong> {user.telefono || 'No especificado'}</p>
          <p className="mb-2"><strong>Dirección:</strong> {user.direccion || 'No especificada'}</p>
          <button className="btn btn-outline w-100 mt-4">Editar Datos</button>
        </div>

        {/* Historial de Pedidos */}
        <div>
          <h3 className="serif mb-4">Historial de Pedidos</h3>
          
          {error && <div className="alert alert-error">{error}</div>}
          
          {loadingPedidos ? (
            <div className="spinner-wrap"><div className="spinner"></div></div>
          ) : pedidos.length === 0 ? (
            <p className="text-gray border p-4 text-center">Aún no ha realizado ningún pedido.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {pedidos.map(pedido => (
                <div key={pedido.id} className="card" style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <span className="gold font-weight-bold">Pedido #{pedido.id}</span>
                      <span className="text-gray" style={{ marginLeft: '1rem', fontSize: '0.85rem' }}>{pedido.fechaPedido}</span>
                    </div>
                    <span className="badge" style={{ border: '1px solid var(--color-border)' }}>
                      {pedido.estado.toUpperCase()}
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <p className="text-gray" style={{ fontSize: '0.9rem' }}>{pedido.totalLineas} pieza(s)</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p className="text-gray" style={{ fontSize: '0.8rem', textTransform: 'uppercase' }}>Total</p>
                      <p className="serif" style={{ fontSize: '1.5rem' }}>{pedido.totalFormateado}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
