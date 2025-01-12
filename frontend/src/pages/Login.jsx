import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login_check', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);  // Stockage du token JWT dans le localStorage
      setError('');
      alert('Connexion réussie !');

      // Vérifier si l'utilisateur est admin (par exemple, en utilisant un attribut dans le token JWT)
      // Si tu utilises JWT, tu pourrais décoder le token pour vérifier les rôles de l'utilisateur
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Décoder le token JWT
      const userRole = decodedToken.roles[0];  // Supposons que "roles" est un tableau dans le payload du token

      if (userRole === 'ROLE_ADMIN') {
        navigate('/admin');  // Rediriger vers la page admin si l'utilisateur est un admin
      } else {
        navigate('/user');   // Rediriger vers la page utilisateur si ce n'est pas un admin
      }
    } catch (err) {
      setError('Échec de la connexion. Vérifiez vos identifiants.');
    }
  };

  return (
    <div className="form-container">
      <h1>Connexion</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
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

        <button type="submit">Se connecter</button>
      </form>
      <Link to="/signin">Pas encore inscrit ? S'inscrire</Link>
      <Link to="/forgot-password">Mot de passe oublié ?</Link>
    </div>
  );
};

export default Login;
