import React from 'react';
import { createRoot } from 'react-dom/client'; 
import App from './App';
import { AuthProvider } from './providers/AuthProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/global.css';
import { GameProvider } from './contexts/GameContext';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <GameProvider>
        <App />
      </GameProvider>
    </AuthProvider>
  </React.StrictMode>
);
