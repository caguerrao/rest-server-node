const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');
const { validarCampos } = require('../middlewares');

const router = Router();

router.post('/', cargarArchivo);

router.put('/:coleccion/:id', [
    check('id', 'El ID debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas( c , ['usuarios', 'productos'])),
    validarCampos 
],actualizarImagen)

module.exports = router;