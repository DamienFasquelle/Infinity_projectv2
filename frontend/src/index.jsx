import React from 'react';
import { createRoot } from 'react-dom/client'; 
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/global.css';
import { GameProvider } from './contexts/GameContext';
import AuthProvider from './providers/AuthProvider';
import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <GameProvider>
        <App />
      </GameProvider>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
