const express = require('express');
const router = express.Router();

// Controladores
const { getClientes, crearCliente, actualizarCliente, eliminarCliente } = require('../controllers/clientesController');

// Rutas de clientes
router.get('/clientes', getClientes);
router.post('/clientes', crearCliente);
router.put('/clientes/:id', actualizarCliente);
router.delete('/clientes/:id', eliminarCliente);

module.exports = router;