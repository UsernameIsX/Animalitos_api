const express = require('express');
const router = express.Router();
const { getMascotas, crearMascota, actualizarMascota, eliminarMascota } = require('../controllers/mascotasController');

router.get('/mascotas', getMascotas);
router.post('/mascotas', crearMascota);
router.put('/mascotas/:id', actualizarMascota);
router.delete('/mascotas/:id', eliminarMascota);

module.exports = router;