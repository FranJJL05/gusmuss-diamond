import { useState, useEffect } from 'react';
import { fetchApi } from '../api';
import { useLang } from '../context/LanguageContext';
import ProductCard from '../components/ui/ProductCard';
import Navbar from '../components/layout/Navbar';

// Las franjas negras verticales de fondo (BEM: .stripes-bg)
function StripesBg() {
  return (
    <div
      className="stripes-bg fixed inset-0 pointer-events-none z-0"
      style={{
        background: 'repeating-linear-gradient(90deg, #000 0px, #000 35px, transparent 35px, transparent 120px)'
      }}
    />
  );
}

// Barra de búsqueda dorada
function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="relative mx-4 mb-4">
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gus-gold/60" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-gus-gold/20 border border-gus-gold/40 text-gus-black placeholder-gus-gold/60
          pl-9 pr-4 py-2 rounded-full text-sm focus:outline-none focus:border-gus-gold transition-colors"
      />
    </div>
  );
}

export default function Collection({ category = null, pageTitle }) {
  const { t } = useLang();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    const endpoint = category ? `/productos?categoria=${category}` : '/productos';
    fetchApi(endpoint)
      .then(data => setProductos(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [category]);

  const filtered = search
    ? productos.filter(p =>
        p.nombre?.toLowerCase().includes(search.toLowerCase()) ||
        p.material?.toLowerCase().includes(search.toLowerCase()))
    : productos;

  return (
    <div className="relative min-h-screen bg-white">
      <StripesBg />

      {/* Contenido por encima de las rayas */}
      <div className="relative z-10">
        <Navbar title={pageTitle || t.collection.title} />

        <div className="pt-14">
          {/* Barra de búsqueda */}
          <div className="pt-4">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder={t.collection.search}
            />
          </div>

          {/* Grid de productos */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-8 h-8 border-2 border-gus-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-gray-500 py-16 bg-white mx-4 rounded">{t.collection.noResults}</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 px-4 pb-4 bg-white">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
