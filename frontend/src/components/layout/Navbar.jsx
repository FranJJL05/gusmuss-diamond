import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLang } from '../../context/LanguageContext';

export default function Navbar({ title }) {
  const { user, logout } = useAuth();
  const { lang, toggleLang, t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gus-black md:relative md:bg-transparent">
      {/* ==================================================== */}
      {/* VERSIÓN MOBILE (Conservada exacta) */}
      {/* ==================================================== */}
      <div className="flex items-center justify-between px-4 py-3 md:hidden bg-gus-black">
        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="text-white w-8 h-8 flex flex-col justify-center gap-1.5"
          aria-label="Menú"
        >
          <span className="block w-full h-0.5 bg-white transition-all"></span>
          <span className="block w-full h-0.5 bg-white transition-all"></span>
          <span className="block w-full h-0.5 bg-white transition-all"></span>
        </button>

        {/* Logo / title */}
        <div className="text-center flex-1">
          {title ? (
            <span className="text-white tracking-widest text-sm uppercase">{title}</span>
          ) : (
            <Link to="/" className="font-logo text-gus-gold text-3xl">Gusmuss</Link>
          )}
        </div>

        {/* Selector de idioma */}
        <button
          onClick={toggleLang}
          className="text-white/70 text-xs hover:text-gus-gold transition-colors border border-white/20 px-2 py-0.5 rounded"
        >
          {lang === 'es' ? '🇬🇧 EN' : '🇪🇸 ES'}
        </button>
      </div>

      {/* Menú deslizable MOBILE */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-64' : 'max-h-0'} bg-gus-black`}>
        {/* ... mobile nav content ... */}
        <nav className="bg-gus-dark border-t border-gus-gold/20 py-4 px-6 flex flex-col gap-4">
          {[
            { href: '/',           label: t.nav.home },
            { href: '/coleccion',  label: t.nav.ropa },
            { href: '/accesorios', label: t.nav.accessories },
            { href: '/contacto',   label: t.nav.contact },
          ].map(({ href, label }) => (
            <Link
              key={href}
              to={href}
              onClick={() => setMenuOpen(false)}
              className="text-white/80 hover:text-gus-gold transition-colors font-serif tracking-widest uppercase text-sm"
            >
              {label}
            </Link>
          ))}
          {user ? (
            <button
              onClick={() => { logout(); setMenuOpen(false); }}
              className="text-left text-white/80 hover:text-gus-gold transition-colors font-serif tracking-widest uppercase text-sm"
            >
              {t.nav.logout}
            </button>
          ) : null}
        </nav>
      </div>

      {/* ==================================================== */}
      {/* VERSIÓN DESKTOP (Nueva) */}
      {/* ==================================================== */}
      <div className="hidden md:flex flex-col w-full shadow-md z-50">
        {/* Barra superior negra con logo centrado */}
        <div className="bg-black py-4 flex justify-center items-center relative">
          <Link to="/" className="font-logo text-gus-gold text-5xl tracking-wider">
            Gusmuss
          </Link>
          
          {/* Opciones extra: selector de idioma o actions en la esquina */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-6">
            <button
              onClick={toggleLang}
              className="text-white/70 text-sm hover:text-gus-gold transition-colors font-serif"
            >
              {lang === 'es' ? 'ENG' : 'ESP'}
            </button>
            <Link to="/perfil" className="text-white hover:text-gus-gold">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </Link>
            <Link to="/carrito" className="text-white hover:text-gus-gold">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            </Link>
          </div>
        </div>

        {/* Barra caqui inferior con navegación centrada */}
        <div className="bg-[#bda57b] py-3">
          <nav className="flex justify-center gap-20 max-w-7xl mx-auto items-center text-sm font-serif tracking-widest text-[#3d3322]">
            <Link to="/" className="hover:text-black transition-colors">INICIO</Link>
            <Link to="/coleccion" className="hover:text-black transition-colors">ROPA</Link>
            <Link to="/accesorios" className="hover:text-black transition-colors">ACCESORIOS</Link>
            <Link to="/contacto" className="hover:text-black transition-colors">CONTACTO</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
