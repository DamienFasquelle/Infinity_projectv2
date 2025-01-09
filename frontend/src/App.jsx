import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import SignIn from './pages/SignIn';
import ChatBot from './pages/ChatBot';
import Games from './pages/Games';
import About from './pages/About'; 
import Privacy from './pages/Privacy'; 
import Contact from './pages/Contact'; 
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import ForgotPassword from './pages/ForgotPassword';
import GamePage from './pages/GamePage';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/games" element={<Games />} />
        <Route path="/gamepage" element={<GamePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
