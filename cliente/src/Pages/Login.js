import React, { Component } from 'react';
import { Link} from "react-router-dom"
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
            password: "",
            handleSubmit: "",
            setPassword: "",
            Logged:[],
            Loggedon:false
        };

    }
    async componentDidMount() {
        localStorage.setItem('x-auth-token','false')
    }
    handleSubmit = event => {
        event.preventDefault();
    
        axios.post(`http://localhost:4000/api/login`, {
        cedula: this.state.email,
        password: this.state.password })
          .then(res => {
            this.setState({Logged:res.data})
            console.log(this.state.Logged)
            if (this.state.Logged.auth === true)
            {
                this.props.history.push('/');
            }
          })
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
                                <FormGroup controlId="usuario" size="large">
                                    <Form.Label>Usuario</Form.Label>
                                    <FormControl
                                        autoFocus
                                        type="text"
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