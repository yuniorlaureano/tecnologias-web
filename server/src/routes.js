const { Router } = require('express');
const router = Router();
const adminCtrl = require('./controllers/adminController');
const clienteCtrl = require('./controllers/clienteController');
const loginCtrl = require('./controllers/loginController');

//LOGIN ROUTE
router.post('/login', loginCtrl.loginUsers);

//ADMIN ROUTES
router.post('/admins/add', adminCtrl.createAdmin);

//CLIENT ROUTES
router.get('/clientes', clienteCtrl.getCliente);
router.post('/clientes/add', clienteCtrl.createCliente);
router.put('/clientes/:id', clienteCtrl.editCliente);
router.post('/beneficiarios/add', clienteCtrl.createBeneficiario);
router.get('/beneficiarios', clienteCtrl.getBeneficiarios);
router.get('/beneficiarios/:id', clienteCtrl.getBeneficiario);
router.post('/servicios/add', clienteCtrl.createServicio);
router.get('/servicios', clienteCtrl.getServicios);
router.post('/transacciones/add', clienteCtrl.createTransaction);
router.get('/transacciones', clienteCtrl.getTransactions);
router.get('/transacciones/:id', clienteCtrl.getTransaction);
module.exports = router;