import { Link } from 'react-router-dom';
import './Layout.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="piano-stripes">
        <div className="footer-center-block">
          <div className="footer-logo-spaced logo-text">Gusmuss</div>
          <div className="footer-divider"></div>
          
          <div className="footer-bottom-info">
            <span>© {new Date().getFullYear()} Gusmuss Diamond. Todos los derechos reservados.</span>
            <span>📷 @_gusmuss_</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
