import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Le Header global
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import SignIn from './pages/SignIn';
import ChatBot from './pages/ChatBot';
import Games from './pages/Games';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';
import AdminDashboard from './pages/Admin/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import ForgotPassword from './pages/ForgotPassword';
import GamePage from './pages/GamePage'; // Assurez-vous d'importer GamePage
import PrivateRoute from './components/PrivateRoute';
import AdminHeader from './components/AdminHeader';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Header /><Home /></>} />
        <Route path="/login" element={<><Header /><Login /></>} />
        <Route path="/forgot-password" element={<><Header /><ForgotPassword /></>} />
        <Route path="/signin" element={<><Header /><SignIn /></>} />
        <Route path="/chatbot" element={<><Header /><ChatBot /></>} />
        <Route path="/games" element={<><Header /><Games /></>} />
        <Route path="/gamepage/:id" element={<><Header /><GamePage /></>} />
        <Route path="/about" element={<><Header /><About /></>} />
        <Route path="/privacy" element={<><Header /><Privacy /></>} />
        <Route path="/contact" element={<><Header /><Contact /></>} />
        <Route
          path="/user"
          element={
            <PrivateRoute allowedRoles={['ROLE_USER', 'ROLE_ADMIN']}>
              <Header />
              <UserDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={['ROLE_ADMIN']}>
              <AdminHeader />
              <AdminDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
