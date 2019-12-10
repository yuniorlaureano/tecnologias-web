const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const Admin = require('../models/Admin');
const Cliente = require('../models/Cliente');

const adminCtrl = {};

adminCtrl.createAdmin = async (req, res) => {

    const admin = new Admin(
        {
            usuario: 'admin',
            email: 'amdcore@hotmail.com',
            password: '12345',
            role: 'ADMINISTRATOR'
        }
    );

    admin.save();
    res.status(200).send({ message: 'Admin Saved' });

}

adminCtrl.getClientes = async (req, res) => {
    const clientes = await Cliente.find().exec();
    res.json(clientes);
}

module.exports = adminCtrl;