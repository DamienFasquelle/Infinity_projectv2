import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './providers/AuthProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
