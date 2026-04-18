import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchApi } from '../api';
import './Home.css'; // Reusamos los estilos de product-card de Home

export default function Collection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoriaQuery = searchParams.get('categoria');

  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar categorías para el filtro
    fetchApi('/categorias').then(data => setCategorias(data)).catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);
    const endpoint = categoriaQuery ? `/productos?categoria=${categoriaQuery}` : '/productos';
    
    fetchApi(endpoint)
      .then(data => {
        setProductos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [categoriaQuery]);

  const setFilter = (slug) => {
    if (slug) {
      setSearchParams({ categoria: slug });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="container section">
      <div className="section-title">
        <h1>Colección</h1>
        <div className="gold-divider"></div>
        <p>{categoriaQuery ? `Explorando: ${categorias.find(c => c.slug === categoriaQuery)?.nombre || categoriaQuery}` : 'Todas nuestras creaciones'}</p>
      </div>

      {/* Filtros */}
      <div className="collection-filters" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>
        <button 
          className={`btn ${!categoriaQuery ? 'btn-gold' : 'btn-outline'}`}
          onClick={() => setFilter(null)}
        >
          Todo
        </button>
        {categorias.map(c => (
          <button 
            key={c.id} 
            className={`btn ${categoriaQuery === c.slug ? 'btn-gold' : 'btn-outline'}`}
            onClick={() => setFilter(c.slug)}
          >
            {c.nombre}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="spinner-wrap"><div className="spinner"></div></div>
      ) : productos.length === 0 ? (
        <div className="empty-state">
          <h3>No hay piezas en esta categoría</h3>
          <p>Por favor, explora otras opciones de nuestra colección.</p>
        </div>
      ) : (
        <div className="grid-products">
          {productos.map(p => (
            <Link to={`/producto/${p.slug}`} key={p.id} className="card product-card">
              <div className="product-img-wrap">
                {p.imagen ? (
                  <img src={p.imagen} alt={p.nombre} className="product-img" loading="lazy" />
                ) : (
                  <div className="product-img-placeholder">Gusmuss</div>
                )}
                {p.destacado && <span className="badge badge-gold absolute-top-right">Exclusivo</span>}
              </div>
              <div className="product-info">
                <span className="product-cat">{p.categoria?.nombre || 'Alta Joyería'}</span>
                <h3 className="product-name">{p.nombre}</h3>
                <div className="product-meta">
                  <span className="product-material">{p.material}</span>
                  <span className="product-price">{p.precioFormateado}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
