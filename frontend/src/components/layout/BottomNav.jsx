import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useLang } from '../../context/LanguageContext';

// Iconos SVG simples
const HomeIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
  </svg>
);
const ShirtIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 2L2 6l3 2v12h14V8l3-2-4-4-3 2H9L6 2z"/>
  </svg>
);
const DiamondIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5l9.75 9.75 9.75-9.75L12 2.25 2.25 13.5zM2.25 13.5h19.5"/>
  </svg>
);
const UserIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
  </svg>
);
const CartIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
  </svg>
);

export default function BottomNav() {
  const { user } = useAuth();
  const { totalItems } = useCart();
  const { t } = useLang();
  const location = useLocation();
  const path = location.pathname;

  const isActive = (href) => path === href || path.startsWith(href + '/');

  const navItems = [
    { href: '/',            icon: <HomeIcon />,    label: t.nav.home },
    { href: '/coleccion',   icon: <ShirtIcon />,   label: t.nav.ropa },
    { href: '/accesorios',  icon: <DiamondIcon />, label: t.nav.accessories },
    { href: user ? '/perfil' : '/login', icon: <UserIcon />, label: user ? t.nav.profile : t.nav.login },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gus-black border-t border-gus-gold/30 z-50 flex justify-around items-center h-16 px-2">
      {navItems.map(({ href, icon, label }) => (
        <Link
          key={href}
          to={href}
          className={`flex flex-col items-center gap-0.5 text-xs transition-colors duration-200
            ${isActive(href) ? 'text-gus-gold' : 'text-white/60 hover:text-gus-gold'}`}
        >
          {icon}
          <span>{label}</span>
        </Link>
      ))}

      {/* Botón carrito flotante */}
      <Link
        to="/carrito"
        className={`flex flex-col items-center gap-0.5 text-xs transition-colors duration-200 relative
          ${isActive('/carrito') ? 'text-gus-gold' : 'text-white/60 hover:text-gus-gold'}`}
      >
        <CartIcon />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        )}
        <span>{t.nav.cart}</span>
      </Link>
    </nav>
  );
}
