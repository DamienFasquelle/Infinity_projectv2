import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useGames } from '../contexts/GameContext';
import GameCard from '../components/GameCard';
import { fetchRecentGames } from '../services/rawgService';

const Home = () => {
  const { games, loading } = useGames(); // Utilisation du contexte pour récupérer les jeux (si nécessaire)
  const [recentGames, setRecentGames] = useState([]);

  useEffect(() => {
    const getRecentGames = async () => {
      try {
        const gamesData = await fetchRecentGames('2024-01-01'); // On récupère les jeux après janvier 2024
        setRecentGames(gamesData); // Mise à jour de l'état avec les jeux récents
      } catch (error) {
        console.error("Erreur lors de la récupération des jeux récents", error);
      }
    };

    getRecentGames(); // Appel de la fonction pour récupérer les jeux
  }, []); // Ne s'exécute qu'une seule fois, au moment du montage du composant

  // Filtrer les jeux populaires (note >= 4)
  const popularGames = games.filter((game) => game.rating >= 4);

  return (
    <main className="home container">
      {/* Section: Introduction */}
      <section className="intro text-center my-2">
        <h1>Bienvenue sur Infinity Games</h1>
        <p className="intro-text">
          Découvrez les jeux vidéo les plus récents, explorez les classiques intemporels et plongez dans un monde de divertissement infini. Que vous soyez un joueur occasionnel ou un passionné, nous avons quelque chose pour tout le monde !
        </p>
        <Row className="info-blocks justify-content-center my-5">
          <Col lg={4} md={6} sm={12} className="info-block">
            <div className="info-card">
              <h3>Jeux Récents</h3>
              <p>Explorez les dernières sorties de jeux vidéo pour être toujours à jour.</p>
            </div>
          </Col>
          <Col lg={4} md={6} sm={12} className="info-block">
            <div className="info-card">
              <h3>Jeux Populaires</h3>
              <p>Découvrez les jeux les mieux notés et les plus aimés par la communauté.</p>
            </div>
          </Col>
          <Col lg={4} md={6} sm={12} className="info-block">
            <div className="info-card">
              <h3>Genres Variés</h3>
              <p>Parcourez une grande variété de genres pour trouver votre prochain coup de cœur.</p>
            </div>
          </Col>
        </Row>
      </section>

      {/* Section: Jeux Récemment Sortis */}
      <section className="recent-games my-5">
        <h2>Jeux Récemment Sortis</h2>
        {loading ? (
          <p>Chargement des jeux récemment sortis...</p>
        ) : (
          <Row className="justify-content-center">
            {recentGames.slice(0, 8).map((game) => (
              <Col key={game.id} md={6} sm={12} lg={2} className="mb-4">
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
              <Col key={game.id} md={6} sm={12} lg={2} className="mb-4">
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
