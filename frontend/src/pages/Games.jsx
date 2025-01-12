import React, { useState, useEffect } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { useGames } from '../contexts/GameContext'; 
import { fetchPlatforms, fetchGenres, fetchGames } from '../services/rawgService';
import GameCard from '../components/GameCard';

const Games = () => {
  const [games, setGames] = useState([]); // Les jeux locaux
  const { gamesData, loading } = useGames(); // Les jeux venant du context
  const [platforms, setPlatforms] = useState([]);
  const [genres, setGenres] = useState([]);
  const [filters, setFilters] = useState({
    platform: '',
    genre: '',
    rating: '',
  });

  const [gamesToShow, setGamesToShow] = useState(100); 

  useEffect(() => {
    // On récupère d'abord les données de la plateforme, genre et jeux via les services
    const fetchFiltersData = async () => {
      const platformsData = await fetchPlatforms();
      const genresData = await fetchGenres();
      const gamesData = await fetchGames();
      setPlatforms(platformsData.results);
      setGenres(genresData.results);
      setGames(gamesData); // Set les jeux obtenus via la fonction fetchGames()
    };

    fetchFiltersData();
  }, []); // Ce useEffect sera exécuté une seule fois à l'initialisation

  useEffect(() => {
    // Vérifiez que les jeux sont bien récupérés avant d'initialiser le contexte
    if (gamesData && gamesData.length > 0) {
      setGames(gamesData); // Remplace le set local si les données sont déjà dans le contexte
    }
  }, [gamesData]); // Cette dépendance fait en sorte de ne mettre à jour les jeux que si gamesData change

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
      rating: '',
    });
  };

  const handleShowMore = () => {
    setGamesToShow((prev) => prev + 20);
  };

  const handleShowLess = () => {
    setGamesToShow((prev) => Math.max(prev - 20, 100));
  };

  const filteredGames = games.filter((game) => {
    return (
      (filters.platform ? game.platforms.some(p => p.platform.name === filters.platform) : true) &&
      (filters.genre ? game.genres.some(g => g.name === filters.genre) : true) &&
      (filters.rating ? game.rating >= filters.rating : true)
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
              {platforms.map((platform) => (
                <option key={platform.id} value={platform.name}>{platform.name}</option>
              ))}
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
              {genres.map((genre) => (
                <option key={genre.id} value={genre.name}>{genre.name}</option>
              ))}
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
          <Button variant="secondary" onClick={handleResetFilters}>
            Réinitialiser les filtres
          </Button>
        </aside>
      </div>

      <div className="games-content">
        <h2 className="mt-4">Jeux disponibles</h2>
        {loading ? (
          <p>Chargement des jeux...</p>
        ) : (
          <Row className="justify-content-center">
            {filteredGames.slice(0, gamesToShow).map((game) => (
                <Col key={game.id} md={6} sm={12} lg={3} className="mb-4">
                  <GameCard game={game} />
                </Col>
            ))}
          </Row>
        )}
        <div className="pagination">
          <Button variant="primary" onClick={handleShowMore}>
            Voir +
          </Button>
          <Button variant="secondary" onClick={handleShowLess}>
            Voir -
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Games;
