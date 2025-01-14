import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchGameScreenshots, fetchGameVideos } from '../services/rawgService';

const GameCard = ({ game }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [screenshots, setScreenshots] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Récupérer les captures d'écran du jeu
        const screenshotData = await fetchGameScreenshots(game.id);
        setScreenshots(screenshotData.results || []);

        // Récupérer les vidéos du jeu
        const videoData = await fetchGameVideos(game.id);
        setVideos(videoData.results || []);
      } catch (error) {
        console.error('Erreur lors du chargement des données du jeu', error);
      }
    };

    if (game.id) {
      fetchDetails();
    }
  }, [game.id]);

  const handleViewGamePage = () => {
    navigate(`/gamepage/${game.id}`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const videoUrl = videos.length > 0 ? (videos[0].data.max || videos[0].data['480']) : null;


  const limitedPlatforms = game.platforms?.slice(0, 3);
  const limitedGenres = game.genres?.slice(0, 3);

  return (
    <Card
      className="game-card d-flex flex-column"
      style={{ height: '480px', width: '100%', maxWidth: '300px' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Afficher la vidéo au survol, sinon afficher l'image */}
      {isHovered && videoUrl ? (
        <Card.Img
          variant="top"
          as="video"
          controls
          loop
          autoPlay
          muted
          src={videoUrl}
          alt={game.name}
          className="game-card-img"
          style={{ height: '200px', objectFit: 'cover' }}
        />
      ) : (
        <Card.Img
          variant="top"
          src={game.background_image || 'https://via.placeholder.com/150'}
          alt={game.name}
          className="game-card-img"
          style={{ height: '200px', objectFit: 'cover' }}
        />
      )}
      <Card.Body
        className="game-card-body d-flex flex-column"
        style={{ flex: 1, overflow: 'hidden' }} // Empêche le débordement
      >
        <Card.Title>{game.name}</Card.Title>
        <Card.Text
          style={{
            flexGrow: 1,
            overflow: 'hidden',
          
          }}
        >
          <strong>Date de sortie :</strong> {game.released || 'N/A'} <br />
          <strong>Note :</strong> {game.rating || 'Non noté'} / 5 <br />
          <strong>Plateformes : </strong>
          {limitedPlatforms?.map((p) => p.platform.name).join(', ')}{game.platforms?.length > 6 ? '...' : ''} <br />
          <strong>Genres :</strong> {limitedGenres?.map((g) => g.name).join(', ')}{game.genres?.length > 6 ? '...' : ''} <br />
        </Card.Text>
        <Button variant="primary" onClick={handleViewGamePage} style={{ marginTop: 'auto' }}>
          Voir le jeu
        </Button>
      </Card.Body>
    </Card>
  );
};

export default GameCard;
