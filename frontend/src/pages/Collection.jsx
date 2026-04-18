import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchApi } from '../api';
import './Collection.css'; 

export default function Collection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoriaQuery = searchParams.get('categoria');

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hardcode categories or fetch them. Fetching them is better.
  useEffect(() => {
    setLoading(true);
    const endpoint = categoriaQuery ? `/productos?categoria=${categoriaQuery}` : '/productos';
    
    fetchApi(endpoint)
      .then(data => setProductos(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [categoriaQuery]);

  return (
    <div className="container section text-center">
      
      {/* Elementos decorativos de fondo (franjas negras verticales estilo Fetiche) */}
      <div className="vertical-stripes-bg hide-mobile"></div>

      <div style={{position: 'relative', zIndex: 10, background: 'var(--color-white)', paddingBottom: '4rem'}}>
        {loading ? (
          <p>Cargando colección...</p>
        ) : productos.length === 0 ? (
          <div style={{padding: '5rem'}}>No hay artículos en esta colección.</div>
        ) : (
          <div className="products-grid-custom">
            
            {/* Título intermedio (falso elemento de la cuadrícula) */}
            <div className="grid-center-title logo-text hide-mobile">
              Unique<br/>Pieces
            </div>

            {productos.map((p, index) => (
              <div key={p.id} className="product-frame">
                <Link to={`/producto/${p.slug}`} className="frame-image-link">
                  <div className="green-frame-border">
                    {p.imagen ? (
                      <img src={p.imagen} alt={p.nombre} className="frame-img" loading="lazy" />
                    ) : (
                      <div className="frame-placeholder">Gusmuss</div>
                    )}
                  </div>
                </Link>
                
                <div className="frame-footer">
                  <span className="frame-price gold">{p.precioFormateado}</span>
                  <Link to={`/producto/${p.slug}`} className="btn btn-black btn-comprar-oval">Comprar</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
