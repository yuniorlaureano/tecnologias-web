const { Schema, model } = require('mongoose');

const beneficiarioSchema = new Schema({
    nombres: {type: String, require: true},
    apellidos: {type: String, require: true},
    noCuenta: {type: String, require: true},
    email: { type: String },
    clienteId: { type: String, require: true }
});

const Beneficiario = model('Beneficiario', beneficiarioSchema);
module.exports = Beneficiario;