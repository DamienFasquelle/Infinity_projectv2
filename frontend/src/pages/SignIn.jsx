import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/register', {
        username,
        email,
        password,
      });
      
      setSuccess(true);
      setError('');
      alert('Inscription réussie !');
      navigate('/');
    } catch (err) {
      setError('Erreur lors de l’inscription. Veuillez réessayer.');
      setSuccess(false);
    }
  };

  return (
    <div className="form-container">
      <h1>Inscription</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Inscription réussie !</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Prénom</label>
        <input
          type="text"
          id="username"
          placeholder="Entrez votre prénom"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Entrez votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          placeholder="Entrez votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">S'inscrire</button>
      </form>
      <Link to="/login">Déjà inscrit ? Se connecter</Link>
    </div>
  );
};

export default SignIn;
