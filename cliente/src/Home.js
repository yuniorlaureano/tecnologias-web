import React, { Component } from 'react';
import Prueba from './assets/Prueba.jpg';
import Transferencias from './assets/Transferencias.jpg';
import Servicios from './assets/Servicios.jpg';
import { Card, Button, Container, CardDeck } from 'react-bootstrap';

class Home extends Component {
  render() {
    return (
      <Container>
        <CardDeck>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={Prueba} />
            <Card.Body>
              <Card.Title>Servicio de Registro.</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
    </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={Transferencias} />
            <Card.Body>
              <Card.Title>Transferencias E-BANKING.</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
    </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={Servicios} />
            <Card.Body>
              <Card.Title>Pagos de impuestos y servicios.</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
    </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </CardDeck>
      </Container>
    );
  }
}

export default Home;