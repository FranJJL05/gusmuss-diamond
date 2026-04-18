import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { fetchApi } from '../api';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [formData, setFormData] = useState({
    nombre: '', apellidos: '', email: '', password: '', telefono: '', direccion: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 1. Registro
      await fetchApi('/auth/registro', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      // 2. Auto-login tras el registro
      await login(formData.email, formData.password);
      navigate(redirect);
    } catch (err) {
      setError(err.message || 'Error en el registro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container section" style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h1 className="serif gold text-center mb-4">Crear Cuenta</h1>
      <p className="text-gray text-center mb-4">Únase a Gusmuss Diamond para una experiencia exclusiva.</p>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div style={{display: 'flex', gap: '1rem'}}>
          <div className="form-group w-100">
            <label className="form-label">Nombre</label>
            <input type="text" name="nombre" className="form-input" required onChange={handleChange} />
          </div>
          <div className="form-group w-100">
            <label className="form-label">Apellidos</label>
            <input type="text" name="apellidos" className="form-input" required onChange={handleChange} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Correo Electrónico</label>
          <input type="email" name="email" className="form-input" required onChange={handleChange} />
        </div>
        
        <div className="form-group">
          <label className="form-label">Contraseña (Mínimo 6 caracteres)</label>
          <input type="password" name="password" className="form-input" required onChange={handleChange} minLength="6" />
        </div>

        <div className="form-group">
          <label className="form-label">Teléfono (Opcional)</label>
          <input type="tel" name="telefono" className="form-input" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label className="form-label">Dirección de Envío Principal (Opcional)</label>
          <input type="text" name="direccion" className="form-input" onChange={handleChange} />
        </div>

        <button type="submit" className="btn btn-gold w-100" disabled={loading}>
          {loading ? 'Procesando...' : 'Crear Cuenta'}
        </button>
      </form>

      <div className="text-center mt-4">
        <p className="text-gray" style={{fontSize: '0.85rem'}}>
          ¿Ya tiene cuenta? <Link to={`/login?redirect=${redirect}`} className="gold">Inicie sesión aquí</Link>
        </p>
      </div>
    </div>
  );
}
