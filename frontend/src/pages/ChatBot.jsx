import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import GameCard from '../components/GameCard';
import { Row, Col, Container } from 'react-bootstrap';
import { useGames } from '../contexts/GameContext';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const { handleSearch, searchResults } = useGames();
  const token = localStorage.getItem("token");

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim()) {
      const newMessages = [...messages, { role: 'user', content: input }];
      setMessages(newMessages);

      try {
        const response = await axios.post(
          'http://localhost:8000/api/chatbot',
          { message: input },
          { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
        );

        const botResponse = response.data.response;
        setMessages([
          ...newMessages,
          { role: 'bot', content: botResponse },
        ]);

        const gameNames = extractGameNames(botResponse);
        gameNames.forEach((gameName) => handleSearch(gameName));
      } catch (error) {
        console.error('Erreur avec le chatbot:', error);
        setMessages([
          ...newMessages,
          { role: 'bot', content: 'Une erreur est survenue. Réessayez plus tard.' },
        ]);
      }

      setInput('');
    }
  };

  const extractGameNames = (text) => {
    const gameNamesRegex = /([A-Za-z0-9\s\-:]+)/g;
    return (text.match(gameNamesRegex) || []).filter((name) => name.length > 2);
  };

  return (
    <Container fluid className="chatbot-layout py-4">
      <Row>
        {/* Chatbot Section */}
        <Col lg={4} md={6} sm={8}>
          <div className="chat-header bg-primary text-white p-3 rounded">Chatbot</div>
          <div className="chat-body p-3 rounded">
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`chat-message d-flex mb-3 ${msg.role}`}>
                  <div className="avatar me-2">
                    {msg.role === 'user' ? (
                      <img src="/user-avatar.png" alt="User" className="rounded-circle" width="40" />
                    ) : (
                      <img src="/bot-avatar.png" alt="Bot" className="rounded-circle" width="40" />
                    )}
                  </div>
                  <div className={`content p-2 rounded`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="chat-input mt-3 d-flex">
              <input
                type="text"
                className="form-control me-2"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez votre question..."
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button className="btn btn-primary" onClick={sendMessage}>Envoyer</button>
            </div>
          </div>
        </Col>

        {/* Recommended Games Section */}
        <Col lg={8}>
          <div className="bg-dark text-white p-3 rounded">
            <h4>Jeux Recommandés</h4>
            <div className="games-list mt-3">
              <Row className="g-3">
                {searchResults.map((game) => (
                  <Col key={game.id} md={3} sm={12}>
                    <GameCard game={game} />
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatBot;
