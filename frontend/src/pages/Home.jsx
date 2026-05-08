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
    <div className="bg-gus-black md:bg-[#faf9f7] min-h-screen flex flex-col -mt-14 -mb-20 md:mt-0 md:mb-0 pt-14 pb-20 md:pt-0 md:pb-0">
      {/* ======================================== */}
      {/* HOME MÓVIL - Hero pantalla completa      */}
      {/* ======================================== */}
      <div className="md:hidden flex flex-col flex-1">

        {/* Hero: galería a pantalla completa con logo encima */}
        <div className="relative w-full h-[55vh] min-h-[300px]">
          {/* Galería */}
          <div className="absolute inset-0">
            <ImageGallery images={galleryImages} interval={4000} />
          </div>

          {/* Overlay oscuro uniforme, sin gradiente raro */}
          <div className="absolute inset-0 bg-black/50 z-[2]" />

          {/* Logo centrado encima de la imagen */}
          <div className="absolute inset-0 z-[3] flex flex-col items-center justify-center text-center px-6">
            <h1 className="font-logo text-gus-gold text-7xl leading-none drop-shadow-lg">
              {t.home.tagline.split(' ')[0]}
            </h1>
            <p className="font-serif text-gus-gold text-lg tracking-[0.4em] mt-1 uppercase">Diamond</p>
            <div className="w-20 h-px bg-gus-gold/70 mt-4" />
            <p className="text-white/80 text-xs font-serif italic mt-3 tracking-widest">
              {t.home.subtitle}
            </p>
          </div>
        </div>

        {/* Botones de acción debajo */}
        <div className="bg-gus-black flex flex-col items-center gap-3 px-8 py-8">
          <Link
            to="/coleccion"
            className="bg-white text-gus-black font-serif text-base px-10 py-3 rounded-full w-full text-center
              hover:bg-gus-gold hover:text-white transition-all duration-300 shadow-lg"
          >
            {t.home.cta}
          </Link>
          <Link
            to="/accesorios"
            className="border border-gus-gold text-gus-gold font-serif text-sm px-8 py-2.5 rounded-full w-full text-center
              hover:bg-gus-gold hover:text-white transition-all duration-300"
          >
            {t.nav.accessories}
          </Link>
          <Link
            to="/contacto"
            className="text-white/50 font-serif text-xs tracking-widest uppercase mt-1
              hover:text-gus-gold transition-colors"
          >
            {t.nav.contact}
          </Link>
        </div>

      </div>

      {/* ==================================================== */}
      {/* VERSIÓN DESKTOP PREMIUM (Estilo Luxury Editorial) */}
      {/* ==================================================== */}
      <div className="hidden md:flex flex-col flex-1 relative w-full h-full min-h-[900px] overflow-hidden bg-[#faf9f7] pb-20">
        
        {/* Cabecera Tipo Revista Editorial */}
        <div className="text-center w-full z-10 pt-20 pb-12 px-8 flex flex-col items-center">
          <div className="w-px h-16 bg-gus-gold mb-8 opacity-40"></div>
          <p className="font-serif text-[0.65rem] sm:text-xs tracking-[0.4em] text-gray-500 uppercase mb-4">{t.home.editorial.essence}</p>
          <p className="font-serif text-3xl font-light tracking-widest text-gus-black max-w-2xl mx-auto leading-relaxed uppercase">
            {t.home.editorial.moreThan}
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
              <img src="/uploads/tienda1.jpeg" alt="Gusmuss Shop" className="w-full h-full object-cover scale-110 group-hover:scale-105 transition-transform duration-1000" />
            </div>

            {/* Typography Decorativa */}
            <h1 className="font-logo text-black text-9xl absolute -bottom-16 -right-12 z-30 opacity-90 drop-shadow-lg">Gusmuss</h1>
          </div>

          {/* Bloque Central: Valores Flotantes (Refinados) */}
          <div className="col-span-3 flex flex-col gap-12 font-serif text-center mt-32 pl-12">
            <div className="w-full flex justify-start">
               <span className="text-sm tracking-[0.3em] uppercase text-gus-black pb-2 border-b border-gus-gold/30 hover:border-gus-gold transition-colors inline-block cursor-default">{t.home.editorial.family}</span>
            </div>
            <div className="w-full flex justify-end pr-8">
               <span className="text-sm tracking-[0.3em] uppercase text-gus-black pb-2 border-b border-gus-gold/30 hover:border-gus-gold transition-colors inline-block cursor-default">{t.home.editorial.luxury}</span>
            </div>
            <div className="w-full flex justify-start pl-8 relative">
               <span className="text-sm tracking-[0.3em] uppercase text-gus-black pb-2 border-b border-gus-gold/30 hover:border-gus-gold transition-colors inline-block cursor-default">{t.home.editorial.attitude}</span>
            </div>
            <div className="w-full flex justify-center mt-8">
              <Link to="/contacto" className="group relative inline-flex items-center gap-4 bg-gus-black text-white px-8 py-4 uppercase text-xs tracking-widest hover:bg-[#bda57b] transition-all duration-500 overflow-hidden">
                <span className="relative z-10">{t.home.editorial.personalService}</span>
                <svg className="w-4 h-4 relative z-10 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>

          {/* Bloque Derecho: Galería Interactiva con Marco de Revista */}
          <div className="col-span-4 relative h-[600px] shadow-2xl mt-16 bg-white flex items-center justify-center group z-40">
             {/* Marco súper grueso interior tipo cuadro */}
             <div className="absolute inset-0 border-[16px] border-white pointer-events-none z-20 transition-all duration-500 group-hover:border-[24px]"></div>
             
             {/* Contenedor de Galería */}
             <div className="w-full h-full relative z-10">
                <ImageGallery images={galleryImages} interval={3500} autoPlay={true} />
             </div>

             {/* Etiquetas doradas */}
             <div className="absolute -top-4 -right-4 bg-gus-gold text-white p-4 font-logo text-2xl shadow-lg z-30 transform rotate-3">{t.home.featuredTitle || 'Destacados'}</div>
             <div className="absolute bottom-8 left-8 bg-gus-black/80 text-white px-4 py-2 font-serif text-xs tracking-widest uppercase shadow-md z-30 border border-white/20 backdrop-blur">
                New Collection
             </div>
          </div>
        </div>
        {/* BANNER EDITORIAL: Debajo de la galería */}
        <div className="relative w-full max-w-[1400px] mx-auto px-8 lg:px-20 mt-20 overflow-hidden z-10">
          <div className="relative w-full h-[340px] overflow-hidden shadow-2xl group">
            <img
              src="/uploads/tienda2.jpeg"
              alt="Gusmuss Diamond — Nueva Colección"
              className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Overlay oscuro degradado */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent z-10" />
            {/* Texto sobre el banner */}
            <div className="absolute inset-0 z-20 flex flex-col justify-center pl-16">
              <p className="font-serif text-[0.65rem] tracking-[0.5em] text-gus-gold uppercase mb-3">Nueva Temporada</p>
              <h2 className="font-logo text-white text-6xl leading-none mb-4">Colección <br/>Verano</h2>
              <div className="w-16 h-px bg-gus-gold mb-6" />
              <Link
                to="/coleccion"
                className="inline-flex items-center gap-3 text-white font-serif text-xs tracking-widest uppercase border border-white/40 px-6 py-3 w-fit hover:bg-white hover:text-gus-black transition-all duration-300"
              >
                Ver Colección
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
