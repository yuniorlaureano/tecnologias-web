const { Schema, model } = require('mongoose');

const transactionSchema = new Schema({
    cliente: { type: Array, require: true },
    beneficiario: { type: Array },
    servicio: { type: Array },
    montoADepositar: { type: Number },
    montoATransferir: { type: Number },
    montoAPagar: { type: Number },
    concepto: { type: String, require: true },
    fecha: { type: String, require: true },
    tipo: { type: String, require: true }
});

const Transaction = model('Transaction', transactionSchema);
module.exports = Transaction;