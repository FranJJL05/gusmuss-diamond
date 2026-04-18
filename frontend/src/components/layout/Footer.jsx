import { Link } from 'react-router-dom';
import './Layout.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h3 className="serif gold mb-4">Gusmuss Diamond</h3>
          <p className="text-gray">Alta joyería artesanal. Cada pieza cuenta una historia de elegancia eterna y compromiso inquebrantable.</p>
        </div>
        
        <div>
          <h4 className="mb-4">Colección</h4>
          <ul className="footer-links">
            <li><Link to="/coleccion?categoria=anillos">Anillos</Link></li>
            <li><Link to="/coleccion?categoria=collares">Collares</Link></li>
            <li><Link to="/coleccion?categoria=pulseras">Pulseras</Link></li>
            <li><Link to="/coleccion?categoria=pendientes">Pendientes</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4">Atención al Cliente</h4>
          <ul className="footer-links">
            <li><Link to="/contacto">Contacto</Link></li>
            <li><Link to="/envios">Envíos y Devoluciones</Link></li>
            <li><Link to="/garantia">Garantía de por vida</Link></li>
            <li><Link to="/faq">Preguntas Frecuentes</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container text-center">
          <p>© {new Date().getFullYear()} Gusmuss Diamond. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
