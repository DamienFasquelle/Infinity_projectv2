import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="form-container">
      <h1>Connexion</h1>
      <form>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Entrez votre email" required />

        <label htmlFor="password">Mot de passe</label>
        <input type="password" id="password" placeholder="Entrez votre mot de passe" required />

        <button type="submit">Se connecter</button>
      </form>
      <Link to="/signin">Pas encore inscrit ? S'inscrire</Link>
      <Link to="/forgot-password">Mot de passe oublié ?</Link>
    </div>
  );
};

export default Login;