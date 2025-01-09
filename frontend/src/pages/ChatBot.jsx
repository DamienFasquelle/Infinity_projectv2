import { useState } from "react";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() !== '') {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');

      // Simule une réponse du bot
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Merci pour votre message !', sender: 'bot' },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="container">
      <div className="form-container chat-container">
        <h1>ChatBot</h1>
        <div className="chat-window">
          {messages.map((message, index) => (
            <div
              key={index}
              className={message.sender === 'user' ? 'chat-message user' : 'chat-message bot'}
            >
              <span>{message.text}</span>
            </div>
          ))}
        </div>
        <div className="chat-input-container">
          <input
            type="text"
            placeholder="Écrivez un message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleSend} className="btn-gradient">Envoyer</button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
