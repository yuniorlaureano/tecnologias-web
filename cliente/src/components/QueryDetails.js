import React from "react";
import {Modal, Table, Button} from "react-bootstrap";

const QueryDetails = ({show, servicio , montoADepositar, concepto='', fecha='' , tipo='', cliente, onHide}) => (
    <Modal show={show} onHide={onHide} size="lg">
        <Modal.Header closeButton>
        <Modal.Title>Detalles</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
               <dl>
                   <dt>Moto</dt>
                   <dd>{montoADepositar}</dd>
                   <dt>Concepto</dt>
                   <dd>{concepto}</dd>
                   <dt>Fecha</dt>
                   <dd>{fecha}</dd>
                   <dt>tipo</dt>
                   <dd>{tipo}</dd>
               </dl>
               <h3>Cliente</h3>
               <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Cedula</th>
                            <th>noCuenta</th>
                            <th>saldoActual</th>
                            <th>email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cliente ? cliente.map(c => (<tr key={c.noCuenta}>
                            <td>{c.nombres}</td>
                            <td>{c.apellidos}</td>
                            <td>{c.cedula}</td>
                            <td>{c.noCuenta}</td>
                            <td>{c.saldoActual}</td>
                            <td>{c.email}</td>
                        </tr>)) : []}
                    </tbody>
                </Table>
                <h3>Servicio</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nombres</th>
                            <th>Cuenta</th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicio ? servicio.map(c => (<tr key={c.noCuenta}>
                            <td>{c.nombre}</td>
                            <td>{c.noCuenta}</td>
                        </tr>)) : []}
                    </tbody>
                </Table>
            </div>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
            Cerrar
        </Button>
        </Modal.Footer>
    </Modal>
);

export default QueryDetails;