import React, { useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Games = () => {
  const [games] = useState([
    { id: 1, title: 'Jeu A', description: 'Description du jeu A', platform: 'PC', genre: 'Action', popularity: 90, releaseDate: '2024-01-01', rating: 4.5, developer: 'Dev A', price: 'Free', imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Jeu B', description: 'Description du jeu B', platform: 'PlayStation', genre: 'Adventure', popularity: 80, releaseDate: '2023-11-01', rating: 4.0, developer: 'Dev B', price: 'Paid', imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, title: 'Jeu C', description: 'Description du jeu C', platform: 'Xbox', genre: 'RPG', popularity: 70, releaseDate: '2023-12-01', rating: 3.5, developer: 'Dev C', price: 'Free', imageUrl: 'https://via.placeholder.com/150' },
    { id: 4, title: 'Jeu D', description: 'Description du jeu D', platform: 'PC', genre: 'Strategy', popularity: 85, releaseDate: '2024-02-01', rating: 4.2, developer: 'Dev D', price: 'Paid', imageUrl: 'https://via.placeholder.com/150' },
    { id: 5, title: 'Jeu E', description: 'Description du jeu E', platform: 'Nintendo', genre: 'Action', popularity: 95, releaseDate: '2023-10-01', rating: 4.8, developer: 'Dev E', price: 'Free', imageUrl: 'https://via.placeholder.com/150' },
    { id: 6, title: 'Jeu F', description: 'Description du jeu F', platform: 'PlayStation', genre: 'Adventure', popularity: 60, releaseDate: '2023-09-01', rating: 3.8, developer: 'Dev F', price: 'Paid', imageUrl: 'https://via.placeholder.com/150' },
    { id: 7, title: 'Jeu G', description: 'Description du jeu G', platform: 'PC', genre: 'Shooter', popularity: 92, releaseDate: '2024-05-01', rating: 4.6, developer: 'Dev G', price: 'Free', imageUrl: 'https://via.placeholder.com/150' },
    { id: 8, title: 'Jeu H', description: 'Description du jeu H', platform: 'Xbox', genre: 'RPG', popularity: 76, releaseDate: '2024-01-15', rating: 4.3, developer: 'Dev H', price: 'Paid', imageUrl: 'https://via.placeholder.com/150' },
    { id: 9, title: 'Jeu I', description: 'Description du jeu I', platform: 'Nintendo', genre: 'Puzzle', popularity: 80, releaseDate: '2023-08-01', rating: 3.9, developer: 'Dev I', price: 'Free', imageUrl: 'https://via.placeholder.com/150' },
    { id: 10, title: 'Jeu J', description: 'Description du jeu J', platform: 'PC', genre: 'Simulation', popularity: 88, releaseDate: '2023-11-20', rating: 4.7, developer: 'Dev J', price: 'Paid', imageUrl: 'https://via.placeholder.com/150' },
  ]);

  const [filters, setFilters] = useState({
    platform: '',
    genre: '',
    sortBy: 'popularity',
    rating: '',
    price: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      platform: '',
      genre: '',
      sortBy: 'popularity',
      rating: '',
      price: '',
    });
  };

  const sortedGames = games.sort((a, b) => {
    if (filters.sortBy === 'popularity') {
      return b.popularity - a.popularity;
    }
    if (filters.sortBy === 'releaseDate') {
      return new Date(b.releaseDate) - new Date(a.releaseDate);
    }
    return 0;
  });

  const filteredGames = sortedGames.filter((game) => {
    return (
      (filters.platform ? game.platform === filters.platform : true) &&
      (filters.genre ? game.genre === filters.genre : true) &&
      (filters.rating ? game.rating >= filters.rating : true) &&
      (filters.price ? game.price === filters.price : true)
    );
  });

  return (
    <div className="games-container">
      <div className="filters-aside">
        <aside>
          <h3>Filtrer les jeux</h3>
          <div>
            <label>Plateforme</label>
            <select
              name="platform"
              value={filters.platform}
              onChange={handleFilterChange}
            >
              <option value="">Toutes les plateformes</option>
              <option value="PC">PC</option>
              <option value="PlayStation">PlayStation</option>
              <option value="Xbox">Xbox</option>
              <option value="Nintendo">Nintendo</option>
            </select>
          </div>
          <div>
            <label>Genre</label>
            <select
              name="genre"
              value={filters.genre}
              onChange={handleFilterChange}
            >
              <option value="">Tous les genres</option>
              <option value="Action">Action</option>
              <option value="Adventure">Aventure</option>
              <option value="RPG">RPG</option>
              <option value="Strategy">Stratégie</option>
              <option value="Shooter">Shooter</option>
              <option value="Puzzle">Puzzle</option>
              <option value="Simulation">Simulation</option>
            </select>
          </div>
          <div>
            <label>Évaluation</label>
            <select
              name="rating"
              value={filters.rating}
              onChange={handleFilterChange}
            >
              <option value="">Tous</option>
              <option value="4">4 étoiles et plus</option>
              <option value="3">3 étoiles et plus</option>
              <option value="2">2 étoiles et plus</option>
            </select>
          </div>
          <div>
            <label>Prix</label>
            <select
              name="price"
              value={filters.price}
              onChange={handleFilterChange}
            >
              <option value="">Tous les prix</option>
              <option value="Free">Gratuit</option>
              <option value="Paid">Payant</option>
            </select>
          </div>
          <div>
            <label>Trier par</label>
            <select
              name="sortBy"
              value={filters.sortBy}
              onChange={handleFilterChange}
            >
              <option value="popularity">Popularité</option>
              <option value="releaseDate">Date de sortie</option>
            </select>
          </div>
          <Button variant="secondary" onClick={handleResetFilters}>
            Réinitialiser les filtres
          </Button>
        </aside>
      </div>

      <div className="games-content">
        <h2 className="mt-4">Jeux disponibles</h2>

        <Row className="justify-content-center">
          {filteredGames.map((game) => (
            <Col md={3} sm={6} key={game.id} className="mb-4">
              <Card>
                <Card.Img variant="top" src={game.imageUrl} />
                <Card.Body>
                  <Card.Title>{game.title}</Card.Title>
                  <Card.Text>{game.description}</Card.Text>
                  <Button variant="info"><Link to="/gamepage"  className='text-decoration-none text-dark'>Voir plus</Link></Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Games;
