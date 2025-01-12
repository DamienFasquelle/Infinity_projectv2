import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userInfo, setUserInfo] = useState(null); // Ajouter un état pour stocker les infos de l'utilisateur
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // Décoder le token pour obtenir les informations de l'utilisateur
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserInfo(decodedToken);  // Sauvegarder les infos dans l'état
      const userRoles = decodedToken.roles;
      setIsAdmin(userRoles.includes('ROLE_ADMIN'));  // Vérifier si l'utilisateur est admin
      console.log(decodedToken)
    } else {
      setIsAuthenticated(false);
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUserInfo(null);
    navigate('/login');
  };

  return (
    <header className="header-container">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src={logo}
              alt="Infinity Games Logo"
              className="img-fluid navbar-logo"
            />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/games">Jeux</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/chatbot">ChatBot</Link>
              </li>
              {isAdmin && (
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">Admin</Link>
                </li>
              )}
              <li className="nav-item">
                <Link className="nav-link" to="/user">User</Link>
              </li>
            </ul>

            <div className="d-flex align-items-center">
              <form className="d-flex me-3 search-bar-container" role="search">
                <input
                  className="form-control search-bar"
                  type="search"
                  placeholder="Rechercher"
                  aria-label="Rechercher"
                />
                <button
                  className="btn search-button"
                  type="submit"
                >
                  Rechercher
                </button>
              </form>
              {/* Afficher le bouton de connexion ou de déconnexion en fonction de l'état */}
              {isAuthenticated ? (
                <>
                  <span className="me-2">Bienvenue, {userInfo?.username}</span>
                  <button
                    className="btn btn-gradient"
                    onClick={handleLogout}
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <Link
                  className="btn btn-gradient"
                  to="/login"
                >
                  Connexion
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
