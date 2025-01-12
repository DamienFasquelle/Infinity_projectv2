import React, { useEffect, useState } from 'react';
import { Card, Button, Carousel, Row, Col } from 'react-bootstrap';
import { fetchPopularGames } from '../services/rawgService';

const Home = () => {
  const [popularGames, setPopularGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularGames = async () => {
      try {
        const data = await fetchPopularGames();
        setPopularGames(data.results);
      } catch (error) {
        console.error('Erreur lors de la récupération des jeux populaires:', error);
      } finally {
        setLoading(false);
      }
    };
    console.log(popularGames);

    loadPopularGames();
  }, []);
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
        <p>Infinity Games est une plateforme qui vous permet de trouver les derniers jeux disponibles sur toutes les plateformes, avec des critiques détaillées et des recommandations personnalisées.</p>
      </section>

      <section className="news my-5">
  <h2>Actualités du Monde du Jeu</h2>
  <Row className="justify-content-center">
    {/* Card 1 */}
    <Col md={3} sm={6} className="mb-4">
      <Card>
        <Card.Img variant="top" src="https://via.placeholder.com/150" />
        <Card.Body>
          <Card.Title>Jeu A Nouveau Disponible</Card.Title>
          <Card.Text>
            Découvrez le dernier jeu lancé sur toutes les plateformes avec de nouvelles fonctionnalités.
          </Card.Text>
          <Button variant="info">En savoir plus</Button>
        </Card.Body>
      </Card>
    </Col>
    {/* Card 2 */}
    <Col md={3} sm={6} className="mb-4">
      <Card>
        <Card.Img variant="top" src="https://via.placeholder.com/150" />
        <Card.Body>
          <Card.Title>Les Nouveaux Lancements</Card.Title>
          <Card.Text>
            La liste des jeux à venir pour cette année est impressionnante. Ne manquez rien !
          </Card.Text>
          <Button variant="info">En savoir plus</Button>
        </Card.Body>
      </Card>
    </Col>
    {/* Card 3 */}
    <Col md={3} sm={6} className="mb-4">
      <Card>
        <Card.Img variant="top" src="https://via.placeholder.com/150" />
        <Card.Body>
          <Card.Title>Le Jeu du Mois</Card.Title>
          <Card.Text>
            Ce mois-ci, un jeu a fait sensation. Découvrez pourquoi il a été élu meilleur jeu du mois.
          </Card.Text>
          <Button variant="info">En savoir plus</Button>
        </Card.Body>
      </Card>
    </Col>
    {/* Card 4 */}
    <Col md={3} sm={6} className="mb-4">
      <Card>
        <Card.Img variant="top" src="https://via.placeholder.com/150" />
        <Card.Body>
          <Card.Title>Le Jeu Épique</Card.Title>
          <Card.Text>
            Plongez dans une aventure inoubliable avec ce jeu épique, qui a remporté tous les prix cette année.
          </Card.Text>
          <Button variant="info">En savoir plus</Button>
        </Card.Body>
      </Card>
    </Col>
  </Row>
</section>


      {/* Section: Carousel Top Notés */}
      <section className="top-rated-games my-5">
        <h2>Jeux Mieux Notés</h2>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/800x400"
              alt="Premier jeu"
            />
            <Carousel.Caption>
              <h3>Jeu Exceptionnel A</h3>
              <p>Note: 9.5/10 - Un jeu qui fait l'unanimité auprès des joueurs et critiques.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/800x400"
              alt="Deuxième jeu"
            />
            <Carousel.Caption>
              <h3>Jeu Merveilleux B</h3>
              <p>Note: 9/10 - Une aventure incroyable à ne pas manquer.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/800x400"
              alt="Troisième jeu"
            />
            <Carousel.Caption>
              <h3>Jeu Top C</h3>
              <p>Note: 8.8/10 - Un jeu qui vous tiendra en haleine pendant des heures.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>

      <section className="popular-games my-5">
        <h2>Jeux Populaires</h2>
        {loading ? (
          <p>Chargement des jeux populaires...</p>
        ) : (
          <Row className="justify-content-center">
            {popularGames.slice(0, 8).map((game) => (
              <Col key={game.id} md={6} sm={12} lg={3} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={game.background_image} alt={game.name} />
                  <Card.Body>
                    <Card.Title>{game.name}</Card.Title>
                    <Card.Text>
                      Note : {game.rating} / 5<br />
                      Date de sortie : {game.released}
                    </Card.Text>
                    <Button variant="info">Voir les détails</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </section>

    </main>
  );
};

export default Home;
