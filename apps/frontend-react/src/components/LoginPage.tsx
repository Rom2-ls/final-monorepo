// src/components/LoginPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (email === 'test@example.com' && password === 'password') {
            navigate('/dashboard');
        }
    };

    return (
        <div>
            <h2>Se connecter</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Adresse email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Se connecter</button>
            </form>
            <p>Vous n'avez pas de compte ? <Link to="/register">S'inscrire ici</Link></p>
        </div>
    );
}

export default LoginPage;
