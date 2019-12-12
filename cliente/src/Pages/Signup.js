import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { Button, FormGroup, FormControl, Form, Card, Row, Col } from "react-bootstrap";
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

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombres: "",
            aplellidos: "",
            password: "",
            cedula: "",
            numeroDeCuenta: "",
            saldoActual:0.00,
            email:"",
            status:"Activo"
        };

    }

    async componentDidMount() {
        const res = await axios.get(`https://restcountries.eu/rest/v2/capital/tallin`)
        this.setState({ persons: res.data[0].name })
    }

    handleSubmit(event) {
        event.preventDefault();
    }
    render() {
        return (
            <Styles>
                <div className="Login">
                    <form onSubmit={this.handleSubmit}>
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
                                                value={this.state.aplellidos}
                                                onChange={e => this.setState({ aplellidos: e.target.value })}
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
                                                maxLength= "11"
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
                                                type="Email"
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