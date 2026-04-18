import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchApi } from '../api';
import './Home.css';

export default function Home() {
  const [destacados, setDestacados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi('/productos/destacados')
      .then(data => {
        setDestacados(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">El Arte de la <span className="gold">Eternidad</span></h1>
          <p className="hero-subtitle">Alta joyería diseñada para trascender el tiempo y celebrar los momentos más preciados de su vida.</p>
          <div className="hero-actions">
            <Link to="/coleccion" className="btn btn-gold">Descubrir Colección</Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section container">
        <div className="section-title">
          <h2>Piezas Destacadas</h2>
          <div className="gold-divider"></div>
          <p>Selección curada de nuestras creaciones más exquisitas</p>
        </div>

        {loading ? (
          <div className="spinner-wrap"><div className="spinner"></div></div>
        ) : (
          <div className="grid-products">
            {destacados.map(p => (
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
      </section>
    </div>
  );
}
