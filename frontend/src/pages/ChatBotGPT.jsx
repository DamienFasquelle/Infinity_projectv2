import React, { useState } from 'react';
import { getChatbotResponse } from '../services/openaiService';

const ChatbotGPT = () => {
  const [messages, setMessages] = useState([]); // Stocke l'historique des messages
  const [input, setInput] = useState(''); // Champ de saisie utilisateur

  const handleSend = async () => {
    if (!input.trim()) return;

    // Ajouter le message utilisateur à l'historique
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);

    // Obtenir la réponse de GPT
    const botResponse = await getChatbotResponse(input);

    // Ajouter la réponse du bot à l'historique
    setMessages([...newMessages, { role: 'assistant', content: botResponse }]);

    // Réinitialiser l'entrée utilisateur
    setInput('');
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', width: '400px', borderRadius: '10px' }}>
      <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '20px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ margin: '10px 0', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
            <strong>{msg.role === 'user' ? 'Vous' : 'Assistant'}:</strong> {msg.content}
          </div>
        ))}
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Écrivez un message..."
        style={{ width: 'calc(100% - 100px)', padding: '10px', borderRadius: '5px', marginRight: '10px' }}
      />
      <button onClick={handleSend} style={{ padding: '10px', borderRadius: '5px' }}>
        Envoyer
      </button>
    </div>
  );
};

export default ChatbotGPT;
