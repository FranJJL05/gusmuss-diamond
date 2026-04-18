import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      navigate(redirect);
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container section" style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h1 className="serif gold text-center mb-4">Iniciar Sesión</h1>
      <p className="text-gray text-center mb-4">Acceda a su cuenta para gestionar sus colecciones y pedidos.</p>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Correo Electrónico</label>
          <input 
            type="email" 
            className="form-input" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Contraseña</label>
          <input 
            type="password" 
            className="form-input" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-gold w-100" disabled={loading}>
          {loading ? 'Iniciando...' : 'Entrar'}
        </button>
      </form>

      <div className="text-center mt-4">
        <p className="text-gray" style={{fontSize: '0.85rem'}}>
          ¿No tiene cuenta? <Link to={`/registro?redirect=${redirect}`} className="gold">Regístrese aquí</Link>
        </p>
      </div>
    </div>
  );
}
