import React, { useState } from 'react';

const GamePage = () => {
  const [comments, setComments] = useState([
    { user: 'Alice', content: 'Ce jeu est incroyable !', rating: 5 },
    { user: 'Bob', content: 'Pas mal, mais pourrait être amélioré.', rating: 3 },
  ]);

  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);

  const handleAddComment = (e) => {
    e.preventDefault();

    if (newComment.trim() === '' || newRating === 0) return;

    setComments([...comments, { user: 'Utilisateur Anonyme', content: newComment, rating: newRating }]);
    setNewComment('');
    setNewRating(0);
  };

  const averageRating =
    comments.length > 0
      ? comments.reduce((acc, comment) => acc + comment.rating, 0) / comments.length
      : 0;

  return (
    <div className="game-page-container">
      <div className="game-details">
        <img src="https://via.placeholder.com/300" alt="Game Cover" className="game-cover" />
        <div className="game-info">
          <h1>Titre du Jeu</h1>
          <p>Plateforme : PC, PlayStation, Xbox</p>
          <p>Genre : Action, Aventure</p>
          <p>Date de sortie : 12 janvier 2025</p>
          <p>Description : Découvrez un jeu palpitant rempli d'action, de mystère et de défis.</p>
          <div className="game-rating">
            <strong>Note moyenne :</strong> {averageRating.toFixed(1)} / 5
          </div>
        </div>
      </div>

      <div className="comments-section">
        <h2>Commentaires</h2>
        <ul className="comments-list">
          {comments.map((comment, index) => (
            <li key={index} className="comment-item">
              <div>
                <strong>{comment.user}</strong> ({comment.rating} / 5)
              </div>
              <p>{comment.content}</p>
            </li>
          ))}
        </ul>

        <form onSubmit={handleAddComment} className="add-comment-form">
          <h3>Ajouter un commentaire</h3>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Écrivez votre commentaire ici..."
            required
          ></textarea>
          <div className="rating-input">
            <label htmlFor="rating">Note :</label>
            <select
              id="rating"
              value={newRating}
              onChange={(e) => setNewRating(Number(e.target.value))}
              required
            >
              <option value="0">Sélectionnez une note</option>
              <option value="1">1 - Très mauvais</option>
              <option value="2">2 - Mauvais</option>
              <option value="3">3 - Moyen</option>
              <option value="4">4 - Bon</option>
              <option value="5">5 - Excellent</option>
            </select>
          </div>
          <button type="submit">Ajouter</button>
        </form>
      </div>
    </div>
  );
};

export default GamePage;
