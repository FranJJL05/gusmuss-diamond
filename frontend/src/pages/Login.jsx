import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LanguageContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { t } = useLang();
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
    <div className="min-h-[80vh] flex flex-col justify-center px-6 py-10">
      <div className="text-center mb-8">
        <h1 className="font-logo text-gus-gold text-5xl mb-1">Gusmuss</h1>
        <p className="font-serif text-gray-500 text-sm">{t.auth.login}</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">{t.auth.email}</label>
          <input
            type="email" required value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-gus-gold transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">{t.auth.password}</label>
          <input
            type="password" required value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-gus-gold transition-colors"
          />
        </div>

        <button
          type="submit" disabled={loading}
          className="w-full bg-gus-black text-white py-4 rounded-full font-serif italic text-lg hover:bg-gus-gold transition-colors disabled:opacity-50 mt-2"
        >
          {loading ? '...' : t.auth.loginBtn}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        {t.auth.noAccount}{' '}
        <Link to={`/registro?redirect=${redirect}`} className="text-gus-gold hover:underline">{t.auth.register}</Link>
      </p>
    </div>
  );
}
