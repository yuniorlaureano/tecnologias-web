const Admin = require('../models/Admin');
const Cliente = require('../models/Cliente');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const SEED = 'owkdiehbdgty*jr?kfrj?_';

const loginCtrl = {};

loginCtrl.loginUsers = async (req, res) => {

    Admin.findOne({ usuario: req.body.usuario, password: req.body.password }, (err, adminDB) => {

        if (err) {
            return res.json({ message: 'Error al comprobar la Base de Datos' });
        }

        if (!adminDB) {

            Cliente.findOne({ cedula: req.body.cedula}, (err, clienteDB) => {
                if (err) {
                    return res.json({ message: 'Error al comprobar la Base de Datos' });
                }

                if (!clienteDB) {
                    return res.json({ message: 'Usuario Incorrecto' });
                }

                if (!bcrypt.compareSync(req.body.password, clienteDB.password)) {
                    return res.json({ message: 'Password Incorrecto' });
                }

                //CREAR TOKEN
                clienteDB.password = ':)';

                const token = jwt.sign({ clienteDB }, SEED, { expiresIn: 259200 }); // 12 HORAS
                return res.status(200).json({ user: clienteDB, TOKEN: token, auth:true});
            });

        } else {

            if (!bcrypt.compareSync(req.body.password, adminDB.password)) {
                return res.json({ message: 'Password Incorrecto' });
            }

            //CREAR TOKEN
            adminDB.password = ':)';

            const token = jwt.sign({ adminDB }, SEED, { expiresIn: 259200 }); // 12 HORAS
            return res.status(200).json({ user: adminDB, TOKEN: token, auth:true});
        }

    });
}

module.exports = loginCtrl;