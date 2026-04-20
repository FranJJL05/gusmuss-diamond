import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchApi } from '../api';
import { useCart } from '../context/CartContext';
import { useLang } from '../context/LanguageContext';
import ImageGallery from '../components/ui/ImageGallery';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { t } = useLang();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchApi(`/productos/${slug}`)
      .then(setProduct)
      .catch(() => navigate('/coleccion'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="w-10 h-10 border-2 border-gus-gold border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
  if (!product) return null;

  const placeholder = `https://placehold.co/800x1000/1a1a1a/bda57b?text=${encodeURIComponent(product.nombre)}`;
  // Galería: imagen principal + 2 variaciones de color simuladas
  const images = [
    product.imagen || placeholder,
    `https://placehold.co/800x1000/2a2a2a/bda57b?text=Vista+2`,
    `https://placehold.co/800x1000/111111/bda57b?text=Vista+3`,
  ];

  const handleAdd = () => {
    setAdding(true);
    addToCart(product, 1);
    setTimeout(() => {
      setAdding(false);
      navigate('/carrito');
    }, 700);
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Galería de imágenes */}
      <div className="w-full h-80 bg-gray-100">
        <ImageGallery images={images} autoPlay={false} />
      </div>

      {/* Info */}
      <div className="px-5 py-6">
        {/* Categoría */}
        <p className="text-gus-gold text-xs uppercase tracking-widest mb-1">
          {product.categoria?.nombre}
        </p>

        {/* Nombre */}
        <h1 className="font-serif text-2xl text-gus-black mb-2">{product.nombre}</h1>

        {/* Precio */}
        <p className="text-gus-green font-bold text-2xl mb-4">{product.precioFormateado}</p>

        {/* Separador */}
        <div className="w-full h-px bg-gray-200 mb-4"></div>

        {/* Detalles */}
        <div className="space-y-2 mb-6 text-sm text-gray-600">
          <p><span className="font-semibold text-gus-black">{t.product.material}:</span> {product.material}</p>
          <p>
            <span className="font-semibold text-gus-black">{t.product.stock}:</span>{' '}
            {product.stock > 0
              ? <span className="text-green-600">En stock ({product.stock} uds)</span>
              : <span className="text-red-500">{t.product.outOfStock}</span>
            }
          </p>
        </div>

        {/* Descripción */}
        {product.descripcion && (
          <div className="mb-6">
            <h3 className="font-serif font-semibold text-gus-black mb-2">{t.product.description}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{product.descripcion}</p>
          </div>
        )}

        {/* Botón Añadir al Carrito */}
        <button
          onClick={handleAdd}
          disabled={product.stock < 1 || adding}
          className="w-full bg-gus-black text-white font-serif italic text-lg py-4 rounded-full
            hover:bg-gus-gold hover:text-gus-black transition-all duration-300
            disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {adding ? '...' : product.stock > 0 ? t.product.addToCart : t.product.outOfStock}
        </button>

        {/* Garantías */}
        <div className="mt-6 space-y-2 text-xs text-gray-500 text-center">
          <p>✦ Envío asegurado gratuito</p>
          <p>✦ Garantía de por vida</p>
        </div>
      </div>
    </div>
  );
}
