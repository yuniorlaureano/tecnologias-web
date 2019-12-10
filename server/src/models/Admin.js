const { Schema, model } = require('mongoose');

const adminSchema = new Schema({
    usuario: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    role: { type: String, require: true }
});

const Admin = model('Admin', adminSchema);
module.exports = Admin;