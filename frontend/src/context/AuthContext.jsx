import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchApi } from '../api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Al cargar la app, intentamos obtener el usuario actual mediante la cookie de sesión
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await fetchApi('/auth/me');
        setUser(data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const resp = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!resp.ok) throw new Error('Credenciales inválidas');
      
      const data = await resp.json();
      if (data.token) {
        localStorage.setItem('jwt_token', data.token);
      }
      
      // Una vez guardado el token, llamamos al me para traer los datos reales
      const userData = await fetchApi('/auth/me');
      setUser(userData);
      return true;
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    localStorage.removeItem('jwt_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
