import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { Button, FormGroup, FormControl, Form, Card } from "react-bootstrap";
import styled from 'styled-components';
import axios from 'axios';


const Styles = styled.div`
@media all and (min-width: 480px) {
    .Login {
      padding: 30px;
    }
  
    .Login form {
      margin: 0 auto;
      max-width: 500px;
    }

    .error{
        color:red
    }
  }
`;

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            persons: [],
            password: "",
            handleSubmit: "",
            setPassword: "",
        };

    }
    async componentDidMount() {
        const res = await axios.get(`https://restcountries.eu/rest/v2/capital/tallin`)
        this.setState({ email: res.data[0].name })
    }
    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }
    render() {
        const { state = {} } = this.props.location;
        const { error } = state;
        return (
            <Styles>
                {error && <div className="error">ERROR: {error}</div>}
                <div className="Login">
                    <form onSubmit={this.handleSubmit}>
                        <Card border="secondary">
                            <Card.Header>
                                Login
                        </Card.Header>
                            <Card.Body>
                                <FormGroup controlId="email" size="large">
                                    <Form.Label>Email</Form.Label>
                                    <FormControl
                                        autoFocus
                                        type="email"
                                        value={this.state.email}
                                        onChange={e => this.setState({ email: e.target.value })}
                                        placeholder="Nombre de usuario"
                                    />
                                </FormGroup>
                                <FormGroup controlId="password" size="large">
                                    <Form.Label>Password</Form.Label>
                                    <FormControl
                                        value={this.state.password}
                                        onChange={e => this.setState({ password: e.target.value })}
                                        type="password"
                                        placeholder="Contraseña"
                                    />
                                </FormGroup>
                                <Button block size="large" disabled={!this.validateForm()} type="submit">
                                    Login
                            </Button>
                            </Card.Body>
                            <Card.Footer className="text-muted">
                                <Card.Link as={Link} to="/Signup" >Crea una nueva cuenta</Card.Link>
                            </Card.Footer>
                        </Card>
                    </form>
                </div>
            </Styles>
        );
    }
}