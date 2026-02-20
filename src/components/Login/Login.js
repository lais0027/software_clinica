import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Idealmente, usa variables de entorno (.env) para esto
const supabaseUrl = 'https://tu-url.supabase.co';
const supabaseAnonKey = 'tu-anon-key';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="p-8 bg-white shadow-md rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Bienvenido</h2>
        <input 
          type="email" placeholder="Email" className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setEmail(e.target.value)} required 
        />
        <input 
          type="password" placeholder="Contraseña" className="w-full p-2 mb-6 border rounded"
          onChange={(e) => setPassword(e.target.value)} required 
        />
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          {loading ? 'Cargando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
};

export default Login;