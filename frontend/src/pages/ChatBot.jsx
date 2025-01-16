import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import GameCard from '../components/GameCard';
import { Row, Col } from 'react-bootstrap';
import { useGames } from '../contexts/GameContext';


const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const token = localStorage.getItem("token");

  const messagesEndRef = useRef(null);

  const { handleSearch, searchResults, loading } = useGames(); 

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }]);

      try {
        const response = await axios.post(
          'http://localhost:8000/api/chatbot', 
          { message: input },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        
        const botResponse = response.data.response;
        setMessages([
          ...messages,
          { role: 'user', content: input },
          { role: 'bot', content: botResponse },
        ]);

        const gameNames = extractGameNames(botResponse);
        console.log('Jeux détectés:', gameNames);

        gameNames.forEach((gameName) => {
          handleSearch(gameName); 
        });

      } catch (error) {
        console.error('Erreur avec le chatbot:', error);

        const errorMessage =
          error.response?.data?.message || 'Une erreur est survenue. Réessayez plus tard.';
        setMessages([
          ...messages,
          { role: 'user', content: input },
          { role: 'bot', content: errorMessage },
        ]);
      }

      setInput('');
    }
  };

  // Fonction pour extraire les noms de jeux vidéo d'une phrase
  const extractGameNames = (text) => {
    const gameNamesRegex = /([A-Za-z0-9\s\-:]+)/g; // Ceci extrait les mots qui peuvent correspondre à un jeu
    const gameNames = text.match(gameNamesRegex);
    
    return gameNames ? gameNames.filter(name => name.length > 2) : [];
  };

  return (
    <div className="chatbot-container">
      <div className="chat-window">
        <div className="chat-header">Chatbot</div>
        <div className="chat-body">
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${msg.role === 'user' ? 'user-message' : 'bot-message'}`}
              >
                {msg.content}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez votre question..."
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>Envoyer</button>
          </div>
        </div>
      </div>

      {/* Section des jeux recommandés */}
      <div className="recommended-games">
        <h4>Jeux Recommandés</h4>
        <div className="games-list">
          <Row className="justify-content-center">
            {searchResults.map((game) => (
              <Col key={game.id} md={4} sm={6} lg={2} className="mb-4">
                <GameCard game={game} /> {/* Affichage des informations du jeu */}
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
