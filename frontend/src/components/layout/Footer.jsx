// BEM: .piano-footer / .piano-footer__center / .piano-footer__logo
export default function Footer() {
  return (
    <footer className="pb-20 md:pb-0">

      {/* Footer compacto para móvil */}
      <div className="md:hidden bg-gus-black py-6 px-4 text-center">
        {/* Rayas decorativas uniformes arriba */}
        <div className="flex w-full mb-4 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <div key={i} className={`flex-1 h-2 ${i % 2 === 0 ? 'bg-black' : 'bg-white'}`} />
          ))}
        </div>

        <div className="w-16 h-px bg-gus-gold mx-auto mb-2" />
        <span className="font-logo text-gus-gold text-2xl tracking-widest block">G U S M U S S</span>
        <div className="w-16 h-px bg-gus-gold mx-auto mt-2 mb-3" />
        <p className="text-white/50 text-[10px] tracking-widest">
          © {new Date().getFullYear()} Gusmuss Diamond · @_gusmuss_
        </p>

        {/* Rayas decorativas uniformes abajo */}
        <div className="flex w-full mt-4 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <div key={i} className={`flex-1 h-2 ${i % 2 === 0 ? 'bg-black' : 'bg-white'}`} />
          ))}
        </div>
      </div>

      {/* Footer piano para escritorio */}
      <div className="hidden md:flex items-stretch h-28 overflow-hidden">
        {/* Franja izquierda — exactamente 20% del ancho */}
        <div className="piano-stripes w-[20%]" />

        {/* Bloque central — 60% */}
        <div className="w-[60%] bg-gus-black flex flex-col items-center justify-center gap-1">
          <div className="w-20 h-px bg-gus-gold mb-1" />
          <span className="font-logo text-gus-gold text-2xl tracking-widest">G U S M U S S</span>
          <div className="w-20 h-px bg-gus-gold mt-1" />
          <p className="text-white/50 text-[10px] mt-2">
            © {new Date().getFullYear()} Gusmuss Diamond · @_gusmuss_
          </p>
        </div>

        {/* Franja derecha — exactamente 20% del ancho */}
        <div className="piano-stripes w-[20%]" />
      </div>

    </footer>
  );
}
