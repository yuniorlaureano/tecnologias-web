import React, {Component} from "react";
import {Modal, Form, Button, Col} from "react-bootstrap";

class Beneficiarios extends  Component {

    constructor(props){
        super(props);
        this.state = {
            nombres:'',
            apellidos: '',
            cuenta:'',
            email:'',
            password:''
        }
    }

    handleChange = (key, value) => {
        this.setState({
            [key]: value
        });
    }

    render(){
        return (<Modal show={this.props.show} onHide={this.props.onHide} size="lg">
        <Modal.Header closeButton>
        <Modal.Title>Beneficiarios</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
  <Form.Row>
    <Form.Group as={Col}>
      <Form.Label>Nombres</Form.Label>
      <Form.Control type="text" name="nombres" value={this.state.nombres} onChange={e => this.handleChange(e.currentTarget.name, e.currentTarget.value)}/>
    </Form.Group>

    <Form.Group as={Col}>
      <Form.Label>Apellidos</Form.Label>
      <Form.Control type="text" name="apellidos" value={this.state.apellidos} onChange={e => this.handleChange(e.currentTarget.name, e.currentTarget.value)}/>
    </Form.Group>
        </Form.Row>

        <Form.Group>
            <Form.Label>Cuenta</Form.Label>
            <Form.Control type="text" name="cuenta" value={this.state.cuenta} onChange={e => this.handleChange(e.currentTarget.name, e.currentTarget.value)}/>
        </Form.Group>

        <Form.Row>
            <Form.Group as={Col}>
            <Form.Label>Correo</Form.Label>
            <Form.Control type="email" name="email" value={this.state.email} onChange={e => this.handleChange(e.currentTarget.name, e.currentTarget.value)}/>
            </Form.Group>

            <Form.Group as={Col}>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e.currentTarget.name, e.currentTarget.value)}/>
            </Form.Group>
        </Form.Row>

        <Button variant="primary" type="button" onClick={() => this.props.onSubmit({...this.state})}>
            Guardar
        </Button>
        </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={this.props.onHide}>
            Cerrar
        </Button>
        </Modal.Footer>
    </Modal>);
    }
};

export default Beneficiarios;