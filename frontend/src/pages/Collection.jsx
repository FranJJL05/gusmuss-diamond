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

  // Render para Accesorios (Escritorio Mockup 3)
  if (category === 'accesorios') {
    return (
      <div className="relative min-h-screen bg-white">
        {/* Barra de Búsqueda Móvil */}
        <div className="md:hidden pt-4">
          <SearchBar value={search} onChange={setSearch} placeholder={t.collection.search} />
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20"><div className="w-8 h-8 border-2 border-gus-gold border-t-transparent rounded-full animate-spin"></div></div>
        ) : (
          <div className="flex flex-col items-center w-full pb-20">
            {/* LILA 1: Sombreros */}
            <div className="w-full flex-col flex items-center mb-12">
               <div className="grid grid-cols-1 md:grid-cols-4 w-full h-[300px] mb-8">
                 {/* Sombreros estáticos basados en el mockup si no hay datos reales, o mapeados. Haremos simulación del layout. */}
                 {filtered.slice(0,4).map((p, i) => (
                    <div key={p.id} className={`flex flex-col justify-center items-center relative ${i % 2 === 1 ? 'bg-black text-white' : 'bg-white text-black'}`}>
                      <img src={p.imagen || `https://placehold.co/400x300/transparent/transparent?text=${p.nombre}`} className="w-48 object-contain z-10 hover:scale-110 transition-transform" />
                      <div className="text-gus-gold mt-4 font-serif text-lg">{p.precioFormateado || p.precio + ' €'}</div>
                      <button className="bg-[#222] text-white px-6 py-1 rounded-full mt-2 font-serif italic hover:bg-gus-gold transition-colors text-sm shadow-md z-10">Comprar</button>
                    </div>
                 ))}
               </div>
               <h2 className="font-logo text-5xl text-black">Nuestros Sombreros</h2>
            </div>
            
            {/* LILA 2: Balsos y barra de meta */}
            <div className="w-full relative py-20 flex px-8 items-center justify-between">
              <div className="flex gap-4 items-end relative z-10 w-1/3">
                 {filtered.slice(4,6).map((p, i) => (
                    <div key={p.id} className="flex flex-col items-center relative">
                      {/* Fondo a rayas (piano) parcial detrás de estos */}
                      <div className="absolute inset-0 bg-piano-stripes opacity-20 -z-10 translate-y-12"></div>
                      <img src={p.imagen || `https://placehold.co/300x200/transparent/transparent?text=${p.nombre}`} className="w-40 object-contain hover:scale-110 transition-transform z-10" />
                      <div className="text-gus-gold mt-4 font-serif font-bold text-sm bg-white px-2 rounded z-10">{p.precioFormateado || p.precio + ' €'} <span className="bg-[#222] text-white px-3 py-1 rounded-full font-serif italic text-xs ml-2 cursor-pointer hover:bg-gus-gold transition-colors">Comprar</span></div>
                    </div>
                 ))}
              </div>
              
              <div className="w-1/3 text-center px-8 z-10">
                 <h3 className="font-logo text-4xl leading-tight">Lleva contigo algo más que estilo: lleva confianza.</h3>
              </div>

              {/* Barra de metal con bolsos */}
              <div className="w-1/3 relative flex justify-center items-center z-10 pr-8">
                 <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[120%] h-4 bg-gradient-to-b from-gray-300 via-gray-100 to-gray-400 shadow-sm border-b border-gray-500 rounded-sm -z-10 -translate-x-8"></div>
                 {filtered.slice(6,8).map(p => (
                   <div key={p.id} className="flex flex-col items-center">
                     <div className="w-1 h-8 bg-gray-600 rounded"></div>
                     <img src={p.imagen || `https://placehold.co/200x250/transparent/transparent?text=${p.nombre}`} className="w-32 object-contain shadow-lg bg-white rounded" />
                     <div className="text-gus-gold mt-4 font-serif font-bold text-sm bg-white px-2 rounded z-10">{p.precioFormateado || p.precio + ' €'} <span className="bg-[#222] text-white px-3 py-1 rounded-full font-serif italic text-xs ml-2 cursor-pointer hover:bg-gus-gold transition-colors">Comprar</span></div>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Render para Ropa (Escritorio Mockup 2 y Móvil por defecto)
  return (
    <div className="relative min-h-screen bg-[#faf9f7]">
      {/* Fondo móvil sutil */}
      <div className="absolute inset-0 pointer-events-none z-0 md:hidden bg-[#faf9f7]" />

      {/* Controles y vista */}
      <div className="relative z-10 pt-8 pb-32">
        {/* Contenedor centralizado premium */}
        <div className="max-w-[1400px] mx-auto px-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="md:w-1/3">
              <h1 className="font-logo text-6xl text-gus-black mb-2 animate-fade-in">{pageTitle || t.collection.title}</h1>
              <div className="w-24 h-px bg-gus-gold opacity-60"></div>
            </div>
            
            {/* Buscador Integrado Superior */}
            <div className="mt-8 md:mt-0 md:w-1/3 text-right">
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder={t.collection.search}
              />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-32">
              <div className="w-10 h-10 border-2 border-gus-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-gray-500 py-32 font-serif tracking-widest">{t.collection.noResults}</p>
          ) : (
            <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
               
               {/* Grid de Ropa */}
               <div className="w-full md:w-3/4">
                 <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-10 gap-y-12">
                   {filtered.map(p => (
                     <div key={p.id} className="group relative">
                       {/* Elemento decorativo tras cuadro (sombra oro desplazada opcional) */}
                       <div className="absolute inset-0 bg-[#f4ebd9] opacity-0 md:group-hover:opacity-100 transition-opacity translate-x-3 translate-y-3 -z-10"></div>
                       <ProductCard product={p} />
                     </div>
                   ))}
                 </div>
               </div>

               {/* Lateral derecho decorativo Escritorio (Elevado y Minimalista) */}
               <div className="hidden md:flex w-1/4 flex-col items-center">
                  <div className="sticky top-32 flex flex-col items-center border border-gus-gold/20 p-8 shadow-sm bg-white">
                    <h2 className="font-logo text-5xl mb-10 transform text-center text-gus-black leading-tight">Unique<br/>Pieces</h2>
                    
                    <div className="w-full product-frame__border p-2 bg-white mb-10 shadow-lg transform -rotate-2">
                        <img src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=400" className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"/>
                    </div>
                    
                    <div className="w-8 h-px bg-gus-gold mb-6"></div>
                    
                    <p className="font-serif text-sm tracking-[0.3em] text-gray-500 uppercase mb-4">Availability</p>
                    <div className="font-serif text-2xl tracking-widest text-gus-black flex gap-6">
                       <span className="hover:text-gus-gold cursor-default transition-colors">XS</span>
                       <span className="hover:text-gus-gold cursor-default transition-colors">S</span>
                       <span className="hover:text-gus-gold cursor-default transition-colors">M</span>
                    </div>

                    <div className="mt-16 flex flex-col items-center justify-center p-6 bg-[#faf9f7] w-full">
                      <div className="w-12 h-12 border border-gus-gold rounded-full flex items-center justify-center mb-3 text-gus-gold"><span className="font-serif text-xl">F</span></div>
                      <span className="tracking-widest font-serif text-sm border-b border-gray-300 pb-1 mb-1">FETICHE</span>
                      <span className="tracking-[0.2em] font-sans text-[0.65rem] text-gray-500">SUANCES</span>
                    </div>
                  </div>
               </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
