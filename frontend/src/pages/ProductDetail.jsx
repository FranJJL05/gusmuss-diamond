import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchApi } from '../api';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchApi(`/productos/${slug}`)
      .then(data => {
        setProduct(data);
        setError(null);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleAddToCart = () => {
    setAdding(true);
    addToCart(product, 1);
    
    // Feedback visual rápido
    setTimeout(() => {
      setAdding(false);
      navigate('/carrito');
    }, 600);
  };

  if (loading) return <div className="spinner-wrap"><div className="spinner"></div></div>;
  if (error) return <div className="container section"><div className="alert alert-error">{error}</div><Link to="/coleccion" className="btn btn-outline">Volver</Link></div>;
  if (!product) return null;

  return (
    <div className="container section product-detail">
      <div className="pd-grid">
        {/* Imagen */}
        <div className="pd-image-col">
          {product.imagen ? (
            <img src={product.imagen} alt={product.nombre} className="pd-image" />
          ) : (
            <div className="pd-image-placeholder">Gusmuss Diamond</div>
          )}
        </div>

        {/* Info */}
        <div className="pd-info-col">
          <nav className="pd-breadcrumbs">
            <Link to="/">Inicio</Link> / 
            <Link to={`/coleccion?categoria=${product.categoria?.slug}`}>{product.categoria?.nombre || 'Colección'}</Link> / 
            <span className="text-gray">{product.nombre}</span>
          </nav>

          <h1 className="pd-title">{product.nombre}</h1>
          <div className="pd-price">{product.precioFormateado}</div>
          
          <div className="pd-meta">
            <p><strong>Material:</strong> {product.material}</p>
            <p><strong>Disponibilidad:</strong> {product.stock > 0 ? <span className="text-success">En stock ({product.stock})</span> : <span className="text-error">Agotado</span>}</p>
          </div>

          <div className="pd-desc">
            <h3 className="serif mb-4">Descripción de la Pieza</h3>
            <p>{product.descripcion || 'Una obra maestra de artesanía y elegancia.'}</p>
          </div>

          <div className="pd-actions">
            <button 
              className="btn btn-gold pd-btn-add" 
              onClick={handleAddToCart}
              disabled={product.stock < 1 || adding}
            >
              {adding ? 'Añadiendo...' : 'Añadir al Carrito'}
            </button>
          </div>

          <div className="pd-perks">
            <div className="perk">
              <span className="gold">✦</span> Envío asegurado gratuito
            </div>
            <div className="perk">
              <span className="gold">✦</span> Certificado de autenticidad GIA
            </div>
            <div className="perk">
              <span className="gold">✦</span> Garantía de por vida
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
