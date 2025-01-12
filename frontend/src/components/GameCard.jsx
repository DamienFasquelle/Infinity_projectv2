import React from 'react';
import { Card } from 'react-bootstrap';

const GameCard = ({ game }) => {
  return (
    <Card className="game-card">
      <Card.Img
        variant="top"
        src={game.background_image || 'https://via.placeholder.com/150'}
        alt={game.name}
      />
      <Card.Body>
        <Card.Title>{game.name}</Card.Title>
        <Card.Text>
          <strong>Date de sortie :</strong> {game.released || 'N/A'} <br />
          <strong>Note :</strong> {game.rating || 'Non noté'} / 5 <br />
          <strong>Plateformes :</strong>{' '}<br />
          {game.platforms?.map((p) => p.platform.name).join(', ') || 'Non spécifié'} <br />
          <strong>Genres :</strong> {game.genres?.map((g) => g.name).join(', ') || 'Non spécifié'}<br />
          {/* <strong>Tags :</strong> {game.tags?.map((t) => t.name).join(', ') || 'Non spécifié'} */}
          {/* <strong>Développeurs :</strong> {game.developers?.map((d) => d.name).join(', ') || 'Non spécifié'} */}

        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default GameCard;
