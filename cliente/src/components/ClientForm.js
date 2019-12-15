import React, {Component} from "react";
import {Modal, Form, Button, Col} from "react-bootstrap";

class QueryDetails extends  Component {

    constructor(props){
        super(props);
        this.state = {
            nombres:'',
            cedula:'',
            cuenta:'',
            saldo:'',
            email:'',
            password:'',
            status:'',
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
        <Modal.Title>Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
  <Form.Row>
    <Form.Group as={Col}>
      <Form.Label>Nombre</Form.Label>
      <Form.Control type="text" name="name" value={this.state.nombre} onChange={e => this.props.onChange(e.target.name, e.target.value)}/>
    </Form.Group>

    <Form.Group as={Col}>
      <Form.Label>Cedula</Form.Label>
      <Form.Control type="text" name="cedula" value={this.state.cedula} onChange={e => this.props.onChange(e.target.name, e.target.value)}/>
    </Form.Group>
        </Form.Row>

        <Form.Group>
            <Form.Label>Cuenta</Form.Label>
            <Form.Control type="text" name="cuenta" value={this.state.cuenta} onChange={e => this.props.onChange(e.target.name, e.target.value)}/>
        </Form.Group>

        <Form.Group>
            <Form.Label>Saldo</Form.Label>
            <Form.Control type="number" name="sando" value={this.state.saldo} onChange={e => this.props.onChange(e.target.name, e.target.value)}/>
        </Form.Group>

        <Form.Row>
            <Form.Group as={Col}>
            <Form.Label>Correo</Form.Label>
            <Form.Control type="email" name="correo" value={this.state.email} onChange={e => this.props.onChange(e.target.name, e.target.value)}/>
            </Form.Group>

            <Form.Group as={Col}>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" name="password" value={this.state.password} onChange={e => this.props.onChange(e.target.name, e.target.value)}/>
            </Form.Group>
        </Form.Row>

        <Form.Group id="formGridCheckbox">
            <Form.Check type="checkbox" label="Activo" name="status" value={this.state.status} onChange={e => this.props.onChange(e.target.name, e.target.value)}/>
        </Form.Group>

        <Button variant="primary" type="button" onSubmit={this.props.onSubmit}>
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

export default QueryDetails;