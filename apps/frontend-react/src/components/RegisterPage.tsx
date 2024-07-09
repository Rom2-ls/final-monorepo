// src/components/RegisterPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        console.log(`Username: ${username}, Email: ${email}, Password: ${password}`);
    };

    return (
        <div>
            <h2>S'inscrire</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
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
                <button type="submit">S'inscrire</button>
            </form>
            <p>Déjà un compte ? <Link to="/login">Se connecter ici</Link></p>
        </div>
    );
}

export default RegisterPage;
