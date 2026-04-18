import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home-container">
      
      {/* Las rayas grises al fondo (como en el mockup, en los bordes) */}
      <div className="bg-guidelines hide-mobile"></div>

      <section className="hero-light">
        <h2 className="hero-sub font-serif">ESTO ES MÁS QUE UNA SIMPLE MARCA DE ROPA</h2>
        <h1 className="hero-main logo-text" style={{ color: 'var(--color-black)' }}>
          Gusmuss
        </h1>

        <div className="hero-asymmetric-grid">
          
          {/* Columna Izquierda: Círculo y barras negras */}
          <div className="hero-left-art">
            <div className="black-bar bar-1"></div>
            <div className="black-bar bar-2"></div>
            <div className="black-bar bar-3"></div>
            
            <div className="circle-image-wrap">
              <img src="/placeholder-hero-1.jpg" alt="Boutique" className="circle-base" />
            </div>
            
            {/* Hojas falsas encima del círculo */}
            <div className="plant-leaf-decoration left-plant"></div>
          </div>

          {/* Centro: Modulos caqui y Botón */}
          <div className="hero-center-modules">
            <div className="khaki-box box-familia">Familia</div>
            <div className="khaki-box box-lujo">Lujo</div>
            <div className="khaki-box box-actitud">Actitud</div>
            <div className="khaki-box box-servicio">Servicio<br/>Personalizado</div>
            
            <Link to="/contacto" className="btn btn-black action-contact-oval">
              Contactacta con nosotros
            </Link>
          </div>

          {/* Columna Derecha: Fotos con verde y planta derecha */}
          <div className="hero-right-art">
            <div className="img-frame img-top-right">
              <img src="/placeholder-hero-2.jpg" alt="Model" />
              <div className="green-accent top-right-corner"></div>
            </div>

            <div className="img-frame img-bottom-right">
              <img src="/placeholder-hero-2.jpg" alt="Model" />
              <div className="green-accent bottom-left-corner"></div>
            </div>

            <div className="plant-leaf-decoration right-plant"></div>
          </div>

        </div>
      </section>

    </div>
  );
}
