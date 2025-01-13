import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useGames } from '../contexts/GameContext';
import GameCard from '../components/GameCard';

const Home = () => {
  const { games, loading } = useGames();

  // Filtrer les jeux populaires (note >= 4)
  const popularGames = games.filter(game => game.rating >= 4);

  // Filtrer les jeux récemment sortis (après le 1er janvier 2024)
  const recentGames = games.filter(game => new Date(game.released) > new Date('2024-01-01'));

  return (
    <main className="home container">
      {/* Section: Hero */}
      <section className="hero text-center my-5">
        <h1>Bienvenue sur Infinity Games</h1>
      </section>

      {/* Section: Résumé */}
      <section className="summary text-center my-5">
        <h2>Qui sommes-nous ?</h2>
        <p>
          Infinity Games est une plateforme qui vous permet de trouver les derniers jeux disponibles
          sur toutes les plateformes, avec des critiques détaillées et des recommandations
          personnalisées.
        </p>
      </section>

      {/* Section: Jeux Populaires */}
      <section className="popular-games my-5">
        <h2>Jeux Populaires</h2>
        {loading ? (
          <p>Chargement des jeux populaires...</p>
        ) : (
          <Row className="justify-content-center">
            {popularGames.slice(0, 8).map((game) => (
              <Col key={game.id} md={6} sm={12} lg={3} className="mb-4">
                <GameCard game={game} />
              </Col>
            ))}
          </Row>
        )}
      </section>

      {/* Section: Jeux Récemment Sortis */}
      <section className="recent-games my-5">
        <h2>Jeux Récemment Sortis</h2>
        {loading ? (
          <p>Chargement des jeux récemment sortis...</p>
        ) : (
          <Row className="justify-content-center">
            {recentGames.slice(0, 8).map((game) => (
              <Col key={game.id} md={6} sm={12} lg={3} className="mb-4">
                <GameCard game={game} />
              </Col>
            ))}
          </Row>
        )}
      </section>
    </main>
  );
};

export default Home;
