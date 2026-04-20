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

      {/* Bloque central: logo + CTA */}
      <div className="flex flex-col items-center justify-center flex-1 px-8 py-12 gap-8">
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

        {/* Enlace de contacto */}
        <p className="text-white/50 text-sm">
          {t.home.helpText}{' '}
          <Link to="/contacto" className="text-gus-gold hover:underline transition-colors">
            {t.home.helpLink}
          </Link>
        </p>
      </div>
    </div>
  );
}
