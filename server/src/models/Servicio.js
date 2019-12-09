const { Schema, model } = require('mongoose');

const servicioSchema = new Schema({
    nombre: {type: String, require: true},
    noCuenta: {type: String, require: true},
    clienteId: { type: String, require: true }
});

const Servicio = model('Servicio', servicioSchema);
module.exports = Servicio;