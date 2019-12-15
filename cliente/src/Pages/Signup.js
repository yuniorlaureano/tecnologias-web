import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { Button, FormGroup, FormControl, Form, Card, Row, Col, Alert } from "react-bootstrap";
import styled from 'styled-components';
import axios from 'axios';


const Styles = styled.div`
@media all and (min-width: 480px) {
    .Login {
      padding:0px;
    }
  
    .Login form {
      margin: 0 auto;
      max-width: 993px;
    }
  }
`;

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombres: "",
            apellidos: "",
            password: "",
            cedula: "",
            numeroDeCuenta: "",
            saldoActual: 0.00,
            email: "",
            status: "Activo",
            show: true,
            mensaje: "",
            Alert: ""

        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post(`http://localhost:4000/api/clientes/add`, {
            nombres: this.state.nombres,
            apellidos: this.state.apellidos,
            cedula: this.state.cedula,
            email: this.state.email,
            password: this.state.password
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
                if (res.data.message === 'Client Saved') {
                    this.setState({ show: false, mensaje: res.data.message, Alert: 'success' })
                } else {
                    this.setState({ show: false, mensaje: res.data.message, Alert: 'danger' })
                }

            })
    }
    render() {
        return (
            <Styles>
                <div className="Login">
                    <form onSubmit={this.handleSubmit}>
                        <Alert variant={this.state.Alert} hidden={this.state.show} onClose={() => this.setState({ show: true })} dismissible>
                            <Alert.Heading>Oh snap! You got an Mensaje!</Alert.Heading>
                            <p>
                                {this.state.mensaje}
                            </p>
                        </Alert>
                        <Card border="secondary">
                            <Card.Header>
                                Formulario de registro de cliente.
                        </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <FormGroup controlId="Nombres" size="large">
                                            <Form.Label>Nombres:</Form.Label>
                                            <FormControl
                                                autoFocus
                                                type="text"
                                                value={this.state.nombres}
                                                onChange={e => this.setState({ nombres: e.target.value })}
                                                placeholder="Jhon Doe"
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup controlId="Apellidos" size="large">
                                            <Form.Label>Apellidos:</Form.Label>
                                            <FormControl
                                                value={this.state.apellidos}
                                                onChange={e => this.setState({ apellidos: e.target.value })}
                                                type="text"
                                                placeholder="Cabrera Perez"
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormGroup controlId="Cedula" size="large">
                                            <Form.Label>Cedula:</Form.Label>
                                            <FormControl
                                                type="text"
                                                value={this.state.cedula}
                                                onChange={e => this.setState({ cedula: e.target.value })}
                                                placeholder="000-000000-00"
                                                maxLength="11"
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup controlId="NumerodeCuenta" size="large">
                                            <Form.Label>Numero de cuenta:</Form.Label>
                                            <FormControl
                                                value={this.state.numeroDeCuenta}
                                                onChange={e => this.setState({ numeroDeCuenta: e.target.value })}
                                                type="text"
                                                placeholder="4-001516-3045"
                                                disabled
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormGroup controlId="Saldoactual" size="large">
                                            <Form.Label>Saldo actual:</Form.Label>
                                            <FormControl
                                                type="number"
                                                value={this.state.saldoActual}
                                                onChange={e => this.setState({ saldoActual: e.target.value })}
                                                placeholder="0.00"
                                                disabled
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup controlId="Email" size="large">
                                            <Form.Label>Email</Form.Label>
                                            <FormControl
                                                value={this.state.email}
                                                onChange={e => this.setState({ email: e.target.value })}
                                                type="text"
                                                placeholder="Prueba@test.com"
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormGroup controlId="Estatus" size="large">
                                            <Form.Label>Estatus:</Form.Label>
                                            <FormControl
                                                type="text"
                                                value={this.state.status}
                                                onChange={e => this.setState({ status: e.target.value })}
                                                readOnly
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup controlId="password" size="large">
                                            <Form.Label>Password:</Form.Label>
                                            <FormControl
                                                value={this.state.password}
                                                onChange={e => this.setState({ password: e.target.value })}
                                                type="password"
                                                placeholder="Contraseña"
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Button block type="submit">
                                            Registrar
                            </Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer className="text-muted">
                                <Card.Link as={Link} to="/Login" >Ya tienes una cuenta</Card.Link>
                            </Card.Footer>
                        </Card>
                    </form>
                </div>
            </Styles>
        );
    }
}