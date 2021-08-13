const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria } = require('../controllers/categorias');
const { validarJWT, validarCampos } = require('../middlewares');

const router = Router();

/**
 * {{url}}/api/categorias
 */

// Obtener todas las categorias - público
router.get('/', (req, res) => {
    res.json('get');
});

// Obtener una categoria por id - público
router.get('/:id', (req, res) => {
    res.json('get - id');
});

// Crear categoria - privado - con token válido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

// Actualizar categoria - privado - con token válido
router.put('/:id', (req, res) => {
    res.json('put');
});

// Borrar categoria - privado - Admin
router.delete('/:id', (req, res) => {
    res.json('delete');
});

module.exports = router;