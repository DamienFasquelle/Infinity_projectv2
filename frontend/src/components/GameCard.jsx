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

  // Vérifier la première vidéo disponible, sinon utiliser l'image de couverture
  const videoUrl = videos.length > 0 ? (videos[0].data.max || videos[0].data['480']) : null;

  return (
    <Card 
      className="game-card" 
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
        />
      ) : (
        <Card.Img
          variant="top"
          src={game.background_image || 'https://via.placeholder.com/150'}
          alt={game.name}
          className="game-card-img"
        />
      )}
      <Card.Body className="game-card-body">
        <Card.Title>{game.name}</Card.Title>
        <Card.Text>
          <strong>Date de sortie :</strong> {game.released || 'N/A'} <br />
          <strong>Note :</strong> {game.rating || 'Non noté'} / 5 <br />
          <strong>Plateformes :</strong> <br />
          {game.platforms?.map((p) => p.platform.name).join(', ') || 'Non spécifié'} <br />
          <strong>Genres :</strong> {game.genres?.map((g) => g.name).join(', ') || 'Non spécifié'} <br />
        </Card.Text>
        <Button variant="primary" onClick={handleViewGamePage}>
          Voir le jeu
        </Button>
      </Card.Body>
    </Card>
  );
};

export default GameCard;
