import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLang } from '../../context/LanguageContext';

export default function Navbar({ title }) {
  const { user, logout } = useAuth();
  const { lang, toggleLang, t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gus-black">
      {/* Barra superior: menú | logo | carrito */}
      <div className="flex items-center justify-between px-4 py-3">
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

      {/* Menú deslizable */}
      <div className={`overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-64' : 'max-h-0'}`}>
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
    </header>
  );
}
