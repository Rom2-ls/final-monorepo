import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
    return (
        <div>
            <h1>Bienvenue sur notre application de chat !</h1>
            <p>Connectez-vous ou inscrivez-vous pour commencer à chatter.</p>
            <Link to="/login">
                <button>Se connecter</button>
            </Link>
            <Link to="/register">
                <button>S'inscrire</button>
            </Link>
        </div>
    );
}

export default WelcomePage;
