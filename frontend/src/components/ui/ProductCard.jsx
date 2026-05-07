import { Link } from 'react-router-dom';
import { useLang } from '../../context/LanguageContext';

// BEM: .product-card / .product-card__frame / .product-card__info / .product-card__price
export default function ProductCard({ product }) {
  const { t } = useLang();
  const placeholder = `https://placehold.co/400x500/1a1a1a/bda57b?text=${encodeURIComponent(product.nombre || 'Gusmuss')}`;

  return (
    <Link to={`/producto/${product.slug}`} className="product-card block group">
      {/* Marco verde 3D — BEM: product-card__frame */}
      <div className="product-card__frame product-frame__border aspect-[3/4] overflow-hidden bg-gray-100 relative">
        <img
          src={product.imagen || placeholder}
          alt={product.nombre}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Info — BEM: product-card__info */}
      <div className="product-card__info mt-3 px-1">
        <h3 className="font-serif text-sm text-gus-black truncate pr-4">{product.nombre}</h3>
        <div className="flex items-center justify-between mt-1">
          <span className="product-card__price text-gus-green font-serif font-semibold text-sm">
            {product.precioFormateado}
          </span>
          <span className="product-card__buy bg-gus-black text-white text-[10px] px-3 py-1 rounded-full font-serif italic hover:bg-gray-800 transition-colors">
            {t.collection.buy}
          </span>
        </div>
      </div>
    </Link>
  );
}
