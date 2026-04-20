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
      {/* VERSIÓN DESKTOP (Nueva adaptada al Pantallazo 1) */}
      {/* ==================================================== */}
      <div className="hidden md:flex flex-col flex-1 relative w-full h-full min-h-[800px] overflow-hidden py-12">
        {/* Hero Title */}
        <div className="text-center w-full z-10 mb-8 mt-12">
          <p className="font-serif font-black text-xl tracking-[0.2em] text-black">ESTO ES MÁS QUE UNA SIMPLE MARCA DE ROPA</p>
          <h1 className="font-logo text-black font-light text-8xl mt-4">Gusmuss</h1>
        </div>

        {/* El contendor maestro (relative para asimetría) */}
        <div className="relative w-full h-[600px] max-w-6xl mx-auto flex z-10">
          
          {/* Lado izquierdo con la esfera de la tienda */}
          <div className="absolute left-0 top-0 w-1/3">
            <div className="relative w-80 h-80 rounded-full overflow-hidden shadow-2xl z-20 border-8 border-white bg-white translate-x-12 translate-y-12">
              {/* Imagen central tienda mockup */}
              <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=600" alt="Gusmuss Shop" className="w-full h-full object-cover scale-110" />
            </div>
            
            {/* Decos de barras negras detrás del circulito (como en el mockup) */}
            <div className="absolute top-2 left-6 w-8 h-48 bg-black -z-10"></div>
            <div className="absolute top-1/2 left-32 w-12 h-64 bg-black -z-10"></div>
            <div className="absolute top-52 right-4 w-6 h-56 bg-black -z-10"></div>
          </div>

          {/* Cajas doradas flotantes */}
          <div className="absolute left-[35%] top-1/4 flex flex-col gap-6 font-serif">
            <div className="flex gap-16">
               <div className="bg-[#bda57b] px-8 py-3 text-black shadow-md">Familia</div>
               <div className="bg-[#bda57b] px-10 py-3 text-black shadow-md -translate-y-8">Lujo</div>
            </div>
            <div className="flex justify-center ml-12">
               <div className="bg-[#bda57b] px-12 py-3 text-black shadow-md">Actitud</div>
            </div>
            <div className="bg-[#bda57b] px-6 py-4 text-black shadow-md w-max mt-4 text-center">Servicio<br/>Personalizado</div>
            
            <Link to="/contacto" className="mt-8 relative -left-8 bg-[#222120] text-[#bda57b] border border-[#bda57b] italic font-serif px-8 py-3 rounded-[2rem] w-max shadow-xl hover:bg-black transition-colors">
              Contacta con nosotros
            </Link>
          </div>

          {/* Modelos de la derecha (dispersas) */}
          <div className="absolute right-0 top-0 w-1/3 h-full flex flex-col items-end gap-4 p-4 pr-12">
            {/* Arriba (Chica traje gris) */}
            <div className="w-48 h-64 bg-white p-2 shadow-lg -translate-x-12 relative overflow-hidden">
               <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#8eb243] rotate-45 z-10"></div>
               <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="Modelo 1" />
            </div>
            {/* Centro Abajo (Mono negro difuminado) */}
            <div className="w-44 h-56 bg-white p-2 shadow-lg absolute bottom-20 right-48 overflow-hidden z-20">
               <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-[#8eb243] rotate-45 z-10"></div>
               <img src="https://images.unsplash.com/photo-1509631179647-0c1158a4c0cb?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="Modelo 2" />
            </div>
            {/* Derecha Abajo (Chica cuero negro en pasillo dorado) */}
            <div className="w-44 h-60 bg-white p-2 shadow-lg absolute bottom-12 right-2 overflow-hidden">
               <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-[#8eb243] rotate-45 z-10"></div>
               <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="Modelo 3" />
            </div>
          </div>
        </div>

        {/* Planta (flor) decorativa derecha inferior asomando */}
        <img src="https://images.unsplash.com/photo-1599380909062-8e10b10be5a7?auto=format&fit=crop&q=80&w=500" className="absolute -right-20 -bottom-20 w-80 h-96 object-contain mix-blend-multiply opacity-90 hidden lg:block pointer-events-none" alt="" />
      </div>

    </div>
  );
}
