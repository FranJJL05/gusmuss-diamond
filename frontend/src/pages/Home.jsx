import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchApi } from '../api';
import { useLang } from '../context/LanguageContext';
import ImageGallery from '../components/ui/ImageGallery';

export default function Home() {
  const { t } = useLang();
  const [destacados, setDestacados] = useState([]);

  useEffect(() => {
    fetchApi('/productos/destacados')
      .then(data => setDestacados(data))
      .catch(console.error);
  }, []);

  // Placeholders de galería si no hay imágenes reales
  const galleryImages = destacados.length
    ? destacados.slice(0, 4).map(p =>
        p.imagen || `https://placehold.co/800x600/111111/bda57b?text=${encodeURIComponent(p.nombre)}`)
    : [
        'https://placehold.co/800x600/111111/bda57b?text=Gusmuss+Diamond',
        'https://placehold.co/800x600/1a1a1a/bda57b?text=Nueva+Colección',
        'https://placehold.co/800x600/000000/bda57b?text=Puerto+Banús',
      ];

  return (
    <div className="bg-gus-black min-h-screen flex flex-col">
      {/* Galería hero con transición */}
      <div className="relative w-full h-72">
        <ImageGallery images={galleryImages} interval={4000} />
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none z-[1]"></div>
      </div>

      {/* ==================================================== */}
      {/* VERSIÓN MOBILE (Conservada) */}
      {/* ==================================================== */}
      <div className="flex flex-col items-center justify-center flex-1 px-8 py-12 gap-8 md:hidden">
        {/* Logo grande */}
        <div className="text-center animate-fade-in">
          <h1 className="font-logo text-gus-gold text-7xl leading-none">{t.home.tagline.split(' ')[0]}</h1>
          <p className="font-serif text-gus-gold text-lg tracking-widest mt-1">Diamond</p>
        </div>

        {/* Separador dorado */}
        <div className="w-24 h-px bg-gus-gold opacity-60"></div>

        <p className="text-white/70 text-sm text-center font-serif italic">
          {t.home.subtitle}
        </p>

        {/* Botón principal ovalado blanco */}
        <Link
          to="/coleccion"
          className="bg-white text-gus-black font-serif text-lg px-12 py-3 rounded-full
            hover:bg-gus-gold hover:text-white transition-all duration-300 shadow-lg hover:shadow-gus-gold/30"
        >
          {t.home.cta}
        </Link>
      </div>

      {/* ==================================================== */}
      {/* VERSIÓN DESKTOP PREMIUM (Estilo Luxury Editorial) */}
      {/* ==================================================== */}
      <div className="hidden md:flex flex-col flex-1 relative w-full h-full min-h-[900px] overflow-hidden bg-[#faf9f7] pb-20">
        
        {/* Cabecera Tipo Revista Editorial */}
        <div className="text-center w-full z-10 pt-20 pb-12 px-8 flex flex-col items-center">
          <div className="w-px h-16 bg-gus-gold mb-8 opacity-40"></div>
          <p className="font-serif text-[0.65rem] sm:text-xs tracking-[0.4em] text-gray-500 uppercase mb-4">La Esencia de Puerto Banús</p>
          <p className="font-serif text-3xl font-light tracking-widest text-gus-black max-w-2xl mx-auto leading-relaxed">
            MÁS QUE UNA MARCA DE ROPA
          </p>
          <div className="w-12 h-px bg-gus-gold mt-8 opacity-40"></div>
        </div>

        {/* Contenedor central (Grid Asimétrico Editorial) */}
        <div className="relative w-full max-w-[1400px] mx-auto px-8 lg:px-20 grid grid-cols-12 gap-8 z-10 items-center">
          
          {/* Bloque Izquierdo: Esfera y Slogan */}
          <div className="col-span-5 relative flex flex-col items-center">
            {/* Foto circular con marco */}
            <div className="relative w-96 h-96 rounded-full overflow-hidden shadow-2xl z-20 border-[12px] border-white group">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
              <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=600" alt="Gusmuss Shop" className="w-full h-full object-cover scale-110 group-hover:scale-105 transition-transform duration-1000" />
            </div>

            {/* Typography Decorativa */}
            <h1 className="font-logo text-black text-9xl absolute -bottom-16 -right-12 z-30 opacity-90 drop-shadow-lg">Gusmuss</h1>
          </div>

          {/* Bloque Central: Valores Flotantes (Refinados) */}
          <div className="col-span-3 flex flex-col gap-12 font-serif text-center mt-32 pl-12">
            <div className="w-full flex justify-start">
               <span className="text-sm tracking-[0.3em] uppercase text-gus-black pb-2 border-b border-gus-gold/30 hover:border-gus-gold transition-colors inline-block cursor-default">Familia</span>
            </div>
            <div className="w-full flex justify-end pr-8">
               <span className="text-sm tracking-[0.3em] uppercase text-gus-black pb-2 border-b border-gus-gold/30 hover:border-gus-gold transition-colors inline-block cursor-default">Lujo</span>
            </div>
            <div className="w-full flex justify-start pl-8 relative">
               <span className="text-sm tracking-[0.3em] uppercase text-gus-black pb-2 border-b border-gus-gold/30 hover:border-gus-gold transition-colors inline-block cursor-default">Actitud</span>
            </div>
            <div className="w-full flex justify-center mt-8">
              <Link to="/contacto" className="group relative inline-flex items-center gap-4 bg-gus-black text-white px-8 py-4 uppercase text-xs tracking-widest hover:bg-[#bda57b] transition-all duration-500 overflow-hidden">
                <span className="relative z-10">Servicio Personal</span>
                <svg className="w-4 h-4 relative z-10 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>

          {/* Bloque Derecho: Galería Mampostería (Masonry) */}
          <div className="col-span-4 relative h-[700px]">
            {/* Foto Principal (La más grande) */}
            <div className="absolute top-0 right-0 w-64 h-[420px] bg-white p-2 shadow-xl z-20 group">
               <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Colección Gris" />
               <div className="absolute -bottom-6 -left-6 bg-gus-black text-white p-4 font-logo text-2xl shadow-lg">01</div>
            </div>

            {/* Foto Solapada Secundaria */}
            <div className="absolute bottom-20 left-4 w-48 h-64 bg-white p-2 shadow-xl z-30 group">
               <img src="https://images.unsplash.com/photo-1509631179647-0c1158a4c0cb?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Colección Noir" />
               <div className="absolute -top-4 -right-4 bg-gus-gold text-white p-3 font-logo text-xl shadow-lg">02</div>
            </div>

            {/* Foto Solapada Terciaria (Fondo dorado) */}
            <div className="absolute bottom-0 right-12 w-40 h-56 bg-gus-gold/10 p-2 border border-gus-gold/30 z-10 group backdrop-blur-sm -rotate-3">
               <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700" alt="Editorial Gold" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
