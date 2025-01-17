import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Form, Button } from "react-bootstrap";
import logo from "../assets/images/logo.png";
import { useGames } from "../contexts/GameContext";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const { searchResults, handleSearch, loading } = useGames();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        setUserInfo(decodedToken);
        const userRoles = decodedToken.roles || [];
        setIsAdmin(userRoles.includes("ROLE_ADMIN"));
        setIsUser(userRoles.includes("ROLE_USER"));
      } catch (error) {
        console.error("Token invalide ou corrompu", error);
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setIsAdmin(false);
    setIsUser(false);
    setUserInfo(null);
    navigate("/login");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    handleSearch(e.target.value);
    setShowResults(true); // Afficher les résultats dès que l'utilisateur tape
  };

  const handleSelectResult = (selected) => {
    const selectedGame = searchResults.find(result => result.name === selected);
    if (selectedGame) {
      localStorage.setItem("selectedGameId", selectedGame.id); // Sauvegarde l'ID dans le localStorage
      navigate(`/gamepage/${selectedGame.id}`); // Redirection vers la page du jeu
    }
    setSearchQuery(selected);
    setShowResults(false); // Cacher les résultats après la sélection
  };

  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setShowResults(false); // Cacher la liste déroulante si l'utilisateur clique en dehors
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header-container">
      <Navbar expand="lg" bg="dark" variant="dark" className="py-3">
        <Container className="d-flex justify-content-between align-items-center">
          {/* Logo aligné à gauche */}
          <Navbar.Brand as={Link} to="/">
            <img
              src={logo}
              alt="Infinity Games Logo"
              className="navbar-logo d-inline-block align-top"
              height="40"
            />
          </Navbar.Brand>

          {/* Menu centré */}
          <Navbar.Collapse id="navbar-nav" className="mx-auto">
            <Nav className="d-flex justify-content-center">
              <Nav.Link as={Link} to="/games">
                Jeux
              </Nav.Link>
              <Nav.Link as={Link} to="/chatbot">
                ChatBot
              </Nav.Link>
              {isAdmin && (
                <Nav.Link as={Link} to="/admin">
                  Administration
                </Nav.Link>
              )}
              {isUser && !isAdmin && (
                <Nav.Link as={Link} to="/user">
                  Mon compte
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>

          {/* Barre de recherche et connexion alignée à droite */}
          <div className="d-flex align-items-center ms-3" ref={searchRef}>
            <div className="flex-column">
              <Form className="search-form-container" role="search">
                <div className="search-form">
                  <input
                    type="text"
                    placeholder="Trouver votre jeu"
                    className="search-input"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />

                  {showResults && searchQuery && (
                    <select
                      size="5"
                      onChange={(e) => handleSelectResult(e.target.value)}
                      className="search-dropdown"
                    >
                      {searchResults?.map((result, index) => (
                        <option key={index} value={result.name}>
                          {result.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </Form>
            </div>
            <Button variant="outline-light" type="submit">
              Rechercher
            </Button>
            {isAuthenticated ? (
              <>
                <Button variant="danger" onClick={handleLogout}>
                  Déconnexion
                </Button>
              </>
            ) : (
              <Link className="btn btn-gradient ms-2" to="/login">
                Connexion
              </Link>
            )}
          </div>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
