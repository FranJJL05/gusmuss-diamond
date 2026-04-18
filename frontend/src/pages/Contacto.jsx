import './Contacto.css';

export default function Contacto() {
  return (
    <div className="container contact-container">
      <div className="contact-grid">
        
        {/* Columna Izquierda: Foto grande */}
        <div className="contact-image-wrap">
          <img src="/placeholder-hero-1.jpg" alt="Boutique Gusmuss" className="contact-img" />
        </div>

        {/* Columna Derecha: Texto e Info */}
        <div className="contact-info-wrap">
          <div className="contact-heading">
            <span className="font-serif block mb-2" style={{letterSpacing: '0.1em'}}>EN</span>
            <span className="logo-text">Gusmuss</span>
          </div>

          <p className="contact-desc font-serif">
            OFRECEMOS UN SERVICIO PERSONAL A CADA CLIENTA, SI LE GUSTARÍA AGENDAR UN HUECO CON NOSOTROS, PONTE EN CONTACTO MEDIANTE NUESTRO INSTAGRAM Y NOS PONEMOS MANOS A LA OBRA
          </p>

          {/* Falso Mapa */}
          <div className="contact-map">
             <div className="map-placeholder">
                <span style={{color: 'red', fontSize: '2rem'}}>📍</span>
                <p style={{fontSize: '0.8rem', color: '#666', marginTop: '0.5rem'}}>Mapa de Marina Banús</p>
             </div>
          </div>
        </div>
      </div>

      <div className="contact-bottom-info">
        <p className="font-serif">
          NOS PODEIS ENCONTRAR ÚNICAMENTE EN LA<br/>
          PLAZA MARINA BANÚS, PUERTO BANÚS FRENTE<br/>
          A LA AVENIDA JULIO IGLESIAS
        </p>
      </div>
      
      {/* Planta Falsa Derecha inferior */}
      <div className="contact-plant"></div>
    </div>
  );
}
