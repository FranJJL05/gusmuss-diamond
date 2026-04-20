import { useLang } from '../context/LanguageContext';
import Navbar from '../components/layout/Navbar';

export default function Contacto() {
  const { t } = useLang();

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="pt-14 md:pt-20 md:flex md:w-full md:max-w-6xl md:mx-auto md:min-h-[70vh] md:pb-32">

        {/* Lado Izquierdo (Móvil e Imagen Desktop) */}
        <div className="md:w-1/2 flex flex-col justify-center items-center">
           {/* Cabecera dorada / Titulo en Móvil */}
          <div className="text-center py-8 px-6 md:hidden">
            <p className="text-gray-500 uppercase tracking-widest text-xs mb-1">EN</p>
            <h1 className="font-logo text-gus-black text-5xl mb-4">Gusmuss</h1>
            <p className="font-serif text-sm leading-relaxed text-gray-700 uppercase tracking-wide">
              {t.contact.body}
            </p>
          </div>

          {/* Imagen Desktop */}
          <div className="hidden md:block w-[80%] h-auto shadow-2xl rounded-lg overflow-hidden border-4 border-white">
             <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" />
          </div>

          {/* Dirección en Desktop vs Móvil */}
          <div className="px-6 py-4 md:mt-12 text-center md:text-left">
            <p className="font-serif font-bold text-xs uppercase leading-relaxed tracking-wide md:text-sm md:max-w-[80%]">
              {t.contact.address}
            </p>
          </div>
        </div>

        {/* Franja de piano móvil */}
        <div className="piano-stripes h-12 my-4 md:hidden"></div>

        {/* Lado Derecho (Escritorio text + maps) */}
        <div className="px-6 py-4 flex flex-col gap-4 md:w-1/2 md:justify-center md:pl-16">
          
          <div className="hidden md:block text-center mb-8">
            <p className="text-gray-500 uppercase tracking-widest text-sm mb-1">EN</p>
            <h1 className="font-logo text-gus-black text-7xl mb-6 mt-4">Gusmuss</h1>
            <p className="font-serif leading-relaxed text-gray-800 uppercase tracking-widest">
              {t.contact.body}
            </p>
          </div>

          <p className="font-logo text-gus-black text-2xl md:hidden leading-tight italic">
            {t.contact.slogan}
          </p>

          {/* Mapa Google Maps embed */}
          <div className="w-full rounded overflow-hidden shadow-md md:h-64">
            <iframe
              title="Gusmuss Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.5!2d-4.9558!3d36.4879!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPuerto+Ban%C3%BAs!5e0!3m2!1ses!2ses!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '200px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Franja inferior y resto móvil oculto en desktop (porque en desktop se maneja en el layout principal guiado o footer global) */}
        <div className="md:hidden">
          <div className="piano-stripes h-12 my-4"></div>
          <div className="text-center py-4">
            <a
              href="https://instagram.com/_gusmuss_"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-gus-black hover:text-gus-gold transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span className="font-serif text-sm">@_gusmuss_</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
