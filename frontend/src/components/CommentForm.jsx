import React, { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const CommentForm = ({ gameId }) => {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    console.log("Token JWT :", token);

    if (!token) {
      setError("Vous devez être connecté pour publier un commentaire.");
      return;
    }

    // Décodage du token JWT
    const decodedToken = jwtDecode(token);
    console.log("Décodage du token :", decodedToken);

    const userRoles = decodedToken.roles || [];
    const isUserRole = userRoles.includes("ROLE_USER");

    if (!isUserRole) {
      setError("Vous devez être un utilisateur pour publier un commentaire.");
      return;
    }

    const commentData = {
      content,
      rating,
      gameId: parseInt(gameId),
    };
    console.log("Données envoyées :", commentData);

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/comment`,
        commentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Réponse de la requête :", response);

      if (response.status === 201) {
        setContent("");
        setRating(1); 
        setSuccess("Commentaire ajouté avec succès");
      }
    } catch (err) {
      console.error("Erreur de requête :", err);
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Une erreur s'est produite");
      } else {
        setError("Une erreur s'est produite");
      }
    }
  };

  return (
    <div>
      <h3>Ajouter un Commentaire</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="content">
          <Form.Label>Votre Commentaire</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="rating">
          <Form.Label>Note (1 à 5)</Form.Label>
          <Form.Control
            as="select"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            required
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Publier
        </Button>
      </Form>
    </div>
  );
};

export default CommentForm;
