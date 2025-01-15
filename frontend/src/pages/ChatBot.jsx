import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }]);

      try {
        const response = await axios.post('/api/chatbot', { message: input });
        setMessages([...messages, { role: 'user', content: input }, { role: 'bot', content: response.data.response }]);
      } catch (error) {
        console.error('Erreur avec le chatbot:', error);
      }

      setInput('');
    }
  };

  return (
    <div className="chatbot">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Posez votre question..."
      />
      <button onClick={sendMessage}>Envoyer</button>
    </div>
  );
};

export default Chatbot;
