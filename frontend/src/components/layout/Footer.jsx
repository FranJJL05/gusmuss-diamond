// BEM: .piano-footer / .piano-footer__center / .piano-footer__logo
export default function Footer() {
  return (
    <footer className="piano-footer mt-8">
      {/* Franjas de piano con bloque negro central */}
      <div className="piano-stripes h-32 flex items-center justify-center">
        <div className="piano-footer__center bg-gus-black w-3/4 h-full flex flex-col items-center justify-center gap-1">
          {/* Línea dorada decorativa */}
          <div className="w-20 h-px bg-gus-gold mb-1"></div>
          <span className="piano-footer__logo font-logo text-gus-gold text-2xl tracking-widest">
            G U S M U S S
          </span>
          <div className="w-20 h-px bg-gus-gold mt-1"></div>
          <p className="text-white/50 text-[10px] mt-2">
            © {new Date().getFullYear()} Gusmuss Diamond · @_gusmuss_
          </p>
        </div>
      </div>
    </footer>
  );
}
