
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const Header = () => {
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
              <Link
                className="btn btn-gradient"
                to="/login"
              >
                Connexion
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
