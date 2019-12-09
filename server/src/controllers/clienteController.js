const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const Cliente = require('../models/Cliente');
const Beneficiario = require('../models/Beneficiario');
const Servicio = require('../models/Servicio');
const Transaction = require('../models/Transaction');

const clienteCtrl = {};

clienteCtrl.createCliente = async (req, res) => {

    await Cliente.findOne({ cedula: req.body.cedula }, async (err, setCliente) => {

        if (err) {
            res.status(500).send({
                message: 'Error al comprobar la Base de Datos'
            })
        } else {
            if (!setCliente) {

                const cliente = new Cliente({
                    nombres: req.body.nombres.toUpperCase(),
                    apellidos: req.body.apellidos.toUpperCase(),
                    cedula: req.body.cedula,
                    noCuenta: Math.floor(Math.random() * 90000000) + 10000000,
                    saldoActual: 0,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),
                    status: 'ACTIVE',
                    role: 'CLIENTE'
                });

                await cliente.save();


                /*   let transporter = nodemailer.createTransport({
                       host: 'smtp.gmail.com',
                       secure: false,
                       port: 587,
                       auth: {
                           user: `${EMAIL_APPLICATION}`,
                           pass: `${PASSWORD_APPLICATION}`
                       },
                       tls: {
                           rejectUnauthorized: false
                       }
                   });
   
                   let HelperOptions = {
                       from: `"EIP" <${EMAIL_APPLICATION}`,
                       to: `${teacher.email}`,
                       subject: 'Welcome to English Immersion Program',
                       html: `
                              <h4>${teacher.names} ${teacher.lastnames}...</h4>
   
                              <h4>Your password is: <span style="color:red">${teacher.plainPassword}</span></h4>
   
                              <h4>To Access to the platform, click here.</h4>
                       `
                   };
   
                   transporter.sendMail(HelperOptions, (res, error, info) => {
                       if (error) {
                           return console.log(error);
                       }
                   });*/

                res.status(200).send({ message: 'Client Saved' });

            } else {
                res.status(200).send({ message: 'El cliente ya existe' });
            }
        }
    });
}

clienteCtrl.editCliente = async (req, res) => {

    const id = req.params.id;

    const clienteFromDB = await Cliente.findOne({ _id: id }).exec();
    console.log(req.body);

    /*  bcrypt.compare(req.body.password, clienteFromDB.password, function (err, res) {
      console.log(res);
    });*/

    if (req.body.password) {

        if (req.body.password == '') {

            const cliente = {
                nombres: req.body.nombres.toUpperCase(),
                apellidos: req.body.apellidos.toUpperCase(),
                cedula: clienteFromDB.cedula,
                noCuenta: clienteFromDB.noCuenta,
                saldoActual: clienteFromDB.saldoActual,
                email: req.body.email,
                password: clienteFromDB.password,
                status: clienteFromDB.status,
                role: clienteFromDB.role
            };

            await Cliente.findByIdAndUpdate(id, { $set: cliente }, { new: true });
            res.status(200).send({ message: 'Cliente updated' });
        }

        if (req.body.password != '') {

            const cliente = {
                nombres: req.body.nombres.toUpperCase(),
                apellidos: req.body.apellidos.toUpperCase(),
                cedula: clienteFromDB.cedula,
                noCuenta: clienteFromDB.noCuenta,
                saldoActual: clienteFromDB.saldoActual,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                status: clienteFromDB.status,
                role: clienteFromDB.role
            };

            await Cliente.findByIdAndUpdate(id, { $set: cliente }, { new: true });
            res.status(200).send({ message: 'Cliente updated' });
        }
    }

    if (!req.body.password) {

        const cliente = {
            nombres: req.body.nombres.toUpperCase(),
            apellidos: req.body.apellidos.toUpperCase(),
            cedula: clienteFromDB.cedula,
            noCuenta: clienteFromDB.noCuenta,
            saldoActual: clienteFromDB.saldoActual,
            email: req.body.email,
            password: clienteFromDB.password,
            status: clienteFromDB.status,
            role: clienteFromDB.role
        };

        await Cliente.findByIdAndUpdate(id, { $set: cliente }, { new: true });
        res.status(200).send({ message: 'Cliente updated' });
    }
}

clienteCtrl.createBeneficiario = async (req, res) => {

    await Beneficiario.findOne({ noCuenta: req.body.noCuenta }, async (err, setBeneficiario) => {

        if (err) {
            res.status(500).send({
                message: 'Error al comprobar la Base de Datos'
            })
        } else {
            if (!setBeneficiario) {

                const beneficiario = new Beneficiario({
                    nombres: req.body.nombres.toUpperCase(),
                    apellidos: req.body.apellidos.toUpperCase(),
                    noCuenta: Math.floor(Math.random() * 90000000) + 10000000,
                    email: req.body.email,
                    clienteId: req.body.clienteId
                });

                await beneficiario.save();
                res.status(200).send({ message: 'Beneficiario Saved' });

            } else {
                res.status(200).send({ message: 'El Beneficiario ya existe' });
            }
        }
    });
}

clienteCtrl.getBeneficiarios = async (req, res) => {
    const beneficiarios = await Beneficiario.find().exec();
    res.json(beneficiarios);
}

clienteCtrl.createServicio = async (req, res) => {

    await Servicio.findOne({ nombre: req.body.nombre }, async (err, setServicio) => {

        if (err) {
            res.status(500).send({
                message: 'Error al comprobar la Base de Datos'
            })
        } else {
            if (!setServicio) {

                const servicio = new Servicio({
                    nombre: req.body.nombre.toUpperCase(),
                    noCuenta: Math.floor(Math.random() * 90000000) + 10000000,
                    clienteId: req.body.clienteId
                });

                await servicio.save();
                res.status(200).send({ message: 'Servicio Saved' });

            } else {
                res.status(200).send({ message: 'El servicio ya existe' });
            }
        }
    });
}

clienteCtrl.getServicios = async (req, res) => {
    const servicios = await Servicio.find().exec();
    res.json(servicios);
}

clienteCtrl.createTransaction = async (req, res) => {

    const clienteFromDB = await Cliente.findOne({ _id: req.body.clienteId }).exec();
    
    let d = new Date();
    let months = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
    let days = ["DOMINGO", "LUNES", "MERTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO"];

    if (req.body.tipo == 'Deposito') {

        const depositar = parseInt(clienteFromDB.saldoActual) + parseInt(req.body.montoADepositar);

        const deposito = new Transaction({

            cliente: clienteFromDB,
            montoADepositar: parseInt(req.body.montoADepositar),
            concepto: 'DEPOSITO A CUENTA ' + clienteFromDB.noCuenta + ' DE ' + req.body.montoADepositar,
            fecha: days[d.getDay()] + ' ' + d.toLocaleString('es-CO'),
            tipo: req.body.tipo
        });

        await Cliente.findByIdAndUpdate(clienteFromDB._id, { $set: { saldoActual: depositar } }, { new: true });

        await deposito.save();
        res.status(200).send({ message: 'Deposito Saved' });
    }

    if (req.body.tipo == 'Transferencia') {

        const beneficiarioFromDB = await Beneficiario.findOne({ _id: req.body.beneficiarioId }).exec();

        const trans = new Transaction({

            cliente: clienteFromDB,
            beneficiario: beneficiarioFromDB,
            montoATransferir: parseInt(req.body.montoATransferir),
            concepto: 'TRANSFERENCIA A ' + beneficiarioFromDB.nombres + ' ' + beneficiarioFromDB.apellidos + ' DE ' + req.body.montoATransferir,
            fecha: days[d.getDay()] + ' ' + d.toLocaleString('es-CO'),
            tipo: req.body.tipo
        });

        const descontar = parseInt(clienteFromDB.saldoActual) - parseInt(req.body.montoATransferir);
        await Cliente.findByIdAndUpdate(clienteFromDB._id, { $set: { saldoActual: descontar } }, { new: true });

        await trans.save();
        res.status(200).send({ message: 'Transaccion Saved' });
    }

    if (req.body.tipo == 'Servicio') {

        const servicioFromDB = await Servicio.findOne({ _id: req.body.servicioId }).exec();

        const serv = new Transaction({

            cliente: clienteFromDB,
            servicio: servicioFromDB,
            montoAPagar: parseInt(req.body.montoAPagar),
            concepto: 'PAGO DE ' + months[d.getMonth()] + ' ' + d.getFullYear() + ' A ' + servicioFromDB.nombre + ' DE ' + req.body.montoAPagar,
            fecha: days[d.getDay()] + ' ' + d.toLocaleString('es-CO'),
            tipo: req.body.tipo
        });

        const descontar = parseInt(clienteFromDB.saldoActual) - parseInt(req.body.montoAPagar);
        await Cliente.findByIdAndUpdate(clienteFromDB._id, { $set: { saldoActual: descontar } }, { new: true });

        await serv.save();
        res.status(200).send({ message: 'Transaccion Saved' });
    }
}


module.exports = clienteCtrl;