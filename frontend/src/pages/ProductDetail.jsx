import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchApi } from '../api';
import { useCart } from '../context/CartContext';
import { useLang } from '../context/LanguageContext';
import ImageGallery from '../components/ui/ImageGallery';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const { t } = useLang();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);

  // Rebuscamos la cantidad TOTAL que ya hemos metido en el carrito para ESTE producto (juntando todas las tallas)
  const currentStockInCart = cartItems
      .filter(item => item.productId === product?.id)
      .reduce((sum, item) => sum + item.cantidad, 0);

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
  let images = [product.imagen || placeholder];
  
  if (product.galeria && product.galeria.length > 0) {
      images = [images[0], ...product.galeria];
  } else {
      // Fallback a 3 imágenes si no hay galería real
      images.push(`https://placehold.co/800x1000/2a2a2a/bda57b?text=Vista+2`);
      images.push(`https://placehold.co/800x1000/111111/bda57b?text=Vista+3`);
  }

  const handleAdd = () => {
    setAdding(true);
    addToCart(product, selectedSize, 1);
    setTimeout(() => {
      setAdding(false);
      navigate('/carrito');
    }, 700);
  };

  const hasSizes = product.tallas && product.tallas.length > 0;
  const isSizeRequired = true; // Forzamos q si tienen array de tallas, debe seleccionar
  const canAdd = !hasSizes || selectedSize !== null;

  return (
    <div className="bg-white md:bg-[#faf9f7] min-h-screen pb-24 md:pb-0">
      <div className="md:max-w-[1200px] md:mx-auto md:py-20 md:flex md:gap-16 md:items-start">
        {/* Galería de imágenes */}
        <div className="w-full h-96 md:h-[700px] md:w-1/2 bg-gray-100 relative shadow-sm">
          <ImageGallery images={images} autoPlay={false} />
        </div>

        {/* Info */}
        <div className="px-5 py-8 md:w-1/2 md:p-16 md:bg-white md:shadow-2xl md:relative md:top-8 flex flex-col">
          {/* Categoría */}
          <p className="text-gus-gold text-xs font-serif uppercase tracking-[0.3em] mb-3">
            {product.categoria?.nombre || t.collection.all}
          </p>

          {/* Nombre */}
          <h1 className="font-logo text-4xl md:text-5xl text-gus-black mb-4 leading-tight">{product.nombre}</h1>

          {/* Precio */}
          <p className="font-serif text-gus-green font-bold text-3xl mb-8">{product.precioFormateado}</p>

          {/* Separador */}
          <div className="w-full h-px bg-gray-200 mb-8"></div>

          {/* Detalles */}
          <div className="space-y-4 mb-8 text-sm text-gray-600 font-serif">
            <p className="flex justify-between border-b border-gray-100 pb-2"><span className="font-semibold tracking-widest uppercase text-gus-black text-xs">{t.product.material}</span> <span>{product.material}</span></p>
            <p className="flex justify-between border-b border-gray-100 pb-2">
              <span className="font-semibold tracking-widest uppercase text-gus-black text-xs">{t.product.stock}</span>
              {product.stock > 0
                ? <span className="text-green-600 italic">En stock ({product.stock})</span>
                : <span className="text-red-500 italic">{t.product.outOfStock}</span>
              }
            </p>
          </div>

          {/* Selector de Tallas */}
          {hasSizes && (
            <div className="mb-8">
               <h3 className="font-serif font-semibold text-gus-black tracking-widest text-xs uppercase mb-3">Selecciona tu Talla</h3>
               <div className="flex gap-3">
                 {['XS', 'S', 'M', 'L', 'XL'].map(size => {
                    const available = product.tallas.includes(size);
                    return (
                        <button 
                          key={size}
                          disabled={!available}
                          onClick={() => setSelectedSize(size)}
                          className={`w-12 h-12 flex items-center justify-center font-serif text-sm transition-colors border
                            ${!available ? 'border-gray-200 text-gray-300 bg-gray-50 cursor-not-allowed hidden md:flex' : 
                               (selectedSize === size ? 'bg-gus-black text-white border-gus-black' : 'bg-white text-gus-black border-gray-300 hover:border-gus-black')}
                          `}
                        >
                          {size}
                        </button>
                    )
                 })}
               </div>
            </div>
          )}

          {/* Descripción */}
          {product.descripcion && (
            <div className="mb-10">
              <h3 className="font-serif font-semibold text-gus-black tracking-widest text-xs uppercase mb-3">{t.product.description}</h3>
              <p className="text-gray-500 text-sm leading-relaxed text-justify">{product.descripcion}</p>
            </div>
          )}

          <div className="mt-auto pt-8">
            {/* Botón Añadir al Carrito */}
            <button
              onClick={handleAdd}
              disabled={product.stock < 1 || adding || currentStockInCart >= product.stock || !canAdd}
              className="w-full bg-gus-black text-white font-serif italic text-xl py-5 rounded-none shadow-lg
                hover:bg-gus-gold hover:text-black transition-all duration-300 transform hover:-translate-y-1
                disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
            >
              {adding ? '...' : 
                (product.stock < 1 ? t.product.outOfStock : 
                  (currentStockInCart >= product.stock ? 'Límite de stock alcanzado' : 
                     (!canAdd ? 'Selecciona una talla' : t.product.addToCart)))}
            </button>

            {/* Garantías */}
            <div className="mt-8 flex justify-between text-xs font-serif text-gray-500 border-t border-gray-100 pt-6">
              <p className="flex items-center gap-2"><span className="text-gus-gold text-lg">✦</span> Envío asegurado gratuito</p>
              <p className="flex items-center gap-2"><span className="text-gus-gold text-lg">✦</span> Garantía de por vida</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
