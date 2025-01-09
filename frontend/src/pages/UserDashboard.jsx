import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';

const UserDashboard = () => {
  return (
    <div className="user-dashboard-container">
      <h1 className="mb-4">Tableau de Bord Utilisateur</h1>
      
      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Mes Jeux Favoris</Card.Title>
              <Card.Text>Accédez rapidement à vos jeux favoris.</Card.Text>
              <Button variant="primary">Voir mes favoris</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Jeux Récemment Joués</Card.Title>
              <Card.Text>Reprenez là où vous vous êtes arrêté.</Card.Text>
              <Button variant="primary">Voir l'historique</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Messages</Card.Title>
              <Card.Text>Consultez vos messages et notifications.</Card.Text>
              <Button variant="info">Voir les messages</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Profil</Card.Title>
              <Card.Text>Gérez les informations de votre compte.</Card.Text>
              <Button variant="info">Modifier le profil</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Statistiques Personnelles</Card.Title>
              <Card.Text>Découvrez vos performances et votre progression.</Card.Text>
              <Button variant="info">Voir mes stats</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserDashboard;
