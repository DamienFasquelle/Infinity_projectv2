import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchGameVideos } from '../services/rawgService';

const GameCard = ({ game }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [videos, setVideos] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoritesList, setFavoritesList] = useState([]);

  // Récupérer les vidéos du jeu
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const videoData = await fetchGameVideos(game.id);
        setVideos(videoData.results || []);
      } catch (error) {
        console.error('Erreur lors du chargement des données du jeu', error);
      }
    };

    if (game.id) {
      fetchDetails();
    }

    // Vérifier si le jeu est dans les favoris de l'utilisateur
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://127.0.0.1:8000/api/favorite/list', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setFavoritesList(data.favorites || []); 
          
          if (data.favorites.includes(game.id)) {
            setIsFavorite(true); 
          } else {
            setIsFavorite(false); 
          }
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des favoris:', error);
        });
    }
  }, [game.id]);

  // Gérer la navigation vers la page du jeu
  const handleViewGamePage = () => {
    navigate(`/gamepage/${game.id}`);
  };

  // Gérer les interactions de survol
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const videoUrl = videos.length > 0 ? (videos[0].data.max || videos[0].data['480']) : null;

  const limitedPlatforms = game.platforms?.slice(0, 3);
  const limitedGenres = game.genres?.slice(0, 3);

  // Gérer l'ajout/suppression du jeu dans les favoris
  const handleFavoriteToggle = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.log("Vous devez être connecté pour ajouter aux favoris.");
      return;
    }

    const url = isFavorite
      ? 'http://127.0.0.1:8000/api/favorite/remove'  // Supprimer du favoris
      : 'http://127.0.0.1:8000/api/favorite/add';   // Ajouter aux favoris

    // Effectuer la requête pour ajouter ou retirer des favoris
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
      body: JSON.stringify({
        gameId: game.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Mettre à jour l'état `isFavorite` en fonction de l'action (ajout ou retrait)
          setIsFavorite((prevState) => !prevState); 

          // Mettre à jour la liste des favoris
          if (isFavorite) {
            // Retirer ce jeu de la liste des favoris
            setFavoritesList(favoritesList.filter((id) => id !== game.id));
          } else {
            // Ajouter ce jeu à la liste des favoris
            setFavoritesList([...favoritesList, game.id]);
          }
        } else {
          console.error(data.error || 'Une erreur est survenue.');
        }
      })
      .catch((error) => {
        console.error('Erreur lors de l\'ajout/suppression aux favoris:', error);
      });
  };
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <Card
      className="game-card d-flex flex-column"
      style={{ height: '480px', width: '100%', maxWidth: '300px', position: 'relative' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
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
      <Card.Body className="game-card-body d-flex flex-column" style={{ flex: 1, overflow: 'hidden' }}>
        <Card.Title>{game.name}</Card.Title>
        <Card.Text style={{ flexGrow: 1, overflow: 'hidden' }}>
          <strong>Date de sortie :</strong> {game.released || 'N/A'} <br />
          <strong>Note :</strong> {game.rating || 'Non noté'} / 5 <br />
          <strong>Plateformes : </strong>
          {limitedPlatforms?.map((p) => p.platform.name).join(', ')}{game.platforms?.length > 6 ? '...' : ''} <br />
          <strong>Genres :</strong> {limitedGenres?.map((g) => g.name).join(', ')}{game.genres?.length > 6 ? '...' : ''} <br />
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <Button variant="primary" onClick={handleViewGamePage}>
            Voir le jeu
          </Button>
        </div>
      </Card.Body>

      {isLoggedIn && (
        <div
          className={`favorite-heart ${isFavorite ? 'filled' : ''}`}
          onClick={handleFavoriteToggle}
          style={{
            color: isFavorite ? 'red' : 'gray',  // Cœur rouge si favori, sinon gris
            fontSize: '24px', // Taille du cœur
            cursor: 'pointer', // Indiquer que c'est cliquable
          }}
        >
          {isFavorite ? '❤️' : '🤍'}
        </div>
      )}
    </Card>
  );
};

export default GameCard;



