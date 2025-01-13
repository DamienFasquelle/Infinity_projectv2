import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-container">
      <h1 className="mb-4">Tableau de Bord Administrateur</h1>
      
      <Row className="mb-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Utilisateurs</Card.Title>
              <Card.Text>Gérez les utilisateurs enregistrés.</Card.Text>
              <Button variant="primary">Voir les utilisateurs</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Jeux</Card.Title>
              <Card.Text>Ajoutez, modifiez ou supprimez des jeux.</Card.Text>
              <Button variant="primary">Gérer les jeux</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Statistiques</Card.Title>
              <Card.Text>Consultez les statistiques des jeux et utilisateurs.</Card.Text>
              <Button variant="primary">Voir les statistiques</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Demandes des utilisateurs</Card.Title>
              <Card.Text>Suivez et répondez aux demandes des utilisateurs.</Card.Text>
              <Button variant="info">Voir les demandes</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Configurations</Card.Title>
              <Card.Text>Gérez les paramètres globaux de l'application.</Card.Text>
              <Button variant="info">Modifier les paramètres</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
