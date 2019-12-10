const { Schema, model } = require('mongoose');

const clienteSchema = new Schema({
    nombres: {type: String, require: true},
    apellidos: {type: String, require: true},
    cedula: {type: String, require: true},
    noCuenta: {type: String, require: true},
    saldoActual: {type: Number, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    status: {type: String, require: true},
    role: {type: String, require: true}
});

const Cliente = model('Cliente', clienteSchema);
module.exports = Cliente;