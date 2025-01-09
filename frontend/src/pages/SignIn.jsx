import React from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <div className="form-container">
      <h1>Inscription</h1>
      <form>
        <label htmlFor="firstName">Prénom</label>
        <input type="text" id="firstName" placeholder="Entrez votre prénom" required />

        <label htmlFor="lastName">Nom</label>
        <input type="text" id="lastName" placeholder="Entrez votre nom" required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Entrez votre email" required />

        <label htmlFor="password">Mot de passe</label>
        <input type="password" id="password" placeholder="Entrez votre mot de passe" required />

        <button type="submit">S'inscrire</button>
      </form>
      <Link to="/login">Déjà inscrit ? Se connecter</Link>
    </div>
  );
};

export default SignIn;