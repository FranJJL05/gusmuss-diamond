import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { fetchApi } from '../api';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LanguageContext';

export default function Register() {
  const [form, setForm] = useState({ nombre:'', apellidos:'', email:'', password:'', telefono:'', direccion:'' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { t } = useLang();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await fetchApi('/auth/registro', { method: 'POST', body: JSON.stringify(form) });
      await login(form.email, form.password);
      navigate(redirect);
    } catch (err) {
      setError(err.message || 'Error en el registro');
    } finally {
      setLoading(false);
    }
  };

  const field = (name, label, type = 'text', required = true) => (
    <div>
      <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">{label}</label>
      <input
        type={type} name={name} required={required}
        onChange={handleChange}
        className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-gus-gold transition-colors"
      />
    </div>
  );

  return (
    <div className="px-6 py-10">
      <div className="text-center mb-8">
        <h1 className="font-logo text-gus-gold text-5xl mb-1">Gusmuss</h1>
        <p className="font-serif text-gray-500 text-sm">{t.auth.register}</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {field('nombre', t.auth.name)}
          {field('apellidos', t.auth.surname)}
        </div>
        {field('email', t.auth.email, 'email')}
        {field('password', `${t.auth.password} (mín. 6)`, 'password')}
        {field('telefono', t.auth.phone, 'tel', false)}
        {field('direccion', t.auth.address, 'text', false)}

        <button
          type="submit" disabled={loading}
          className="w-full bg-gus-black text-white py-4 rounded-full font-serif italic text-lg hover:bg-gus-gold transition-colors disabled:opacity-50"
        >
          {loading ? '...' : t.auth.registerBtn}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        {t.auth.alreadyHave}{' '}
        <Link to={`/login?redirect=${redirect}`} className="text-gus-gold hover:underline">{t.auth.login}</Link>
      </p>
    </div>
  );
}
