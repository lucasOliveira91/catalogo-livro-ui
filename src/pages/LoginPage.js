import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                username: 'admin',
                password: 'admin',
            });

            localStorage.setItem('token', response.data.token);

            navigate('/');
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setError('Falha na autenticação. Verifique suas credenciais.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Entrando...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
