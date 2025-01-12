import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useGames } from '../contexts/GameContext';
import GameCard from '../components/GameCard';

const Home = () => {
  const { games, loading } = useGames();

  const popularGames = games.filter(game => game.rating >= 4); 
  const recentGames = games.filter(game => new Date(game.released) > new Date('2024-01-01'));

  return (
    <main className="home container">
      {/* Section: Hero */}
      <section className="hero text-center my-5">
        <h1>Bienvenue sur Infinity Games</h1>
        <p>Découvrez, explorez et profitez des meilleurs jeux de toutes les plateformes.</p>
        <button className="cta btn btn-info">Explorer les jeux</button>
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

      {/* Section: Actualités */}
      <section className="news my-5">
        <h2>Actualités du Monde du Jeu</h2>
        {loading ? (
          <p>Chargement des actualités...</p>
        ) : (
          <Row className="justify-content-center">
            {recentGames.slice(0, 4).map((game) => (
              <Col key={game.id} md={3} sm={6} className="mb-4">
                <GameCard game={game} />
              </Col>
            ))}
          </Row>
        )}
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
    </main>
  );
};

export default Home;
