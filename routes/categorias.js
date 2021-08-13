const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearCategoria,
  obtenerCategoria,
  obtenerCategorias,
  eliminarCategoria,
  actualizarCategoria,
} = require("../controllers/categorias");
const { existeCategoriaPorId } = require("../helpers/db-validators");
const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");

const router = Router();

/**
 * {{url}}/api/categorias
 */

// Obtener todas las categorias - público
router.get("/", obtenerCategorias);

// Obtener una categoria por id - público
router.get(
  "/:id",
  [
    check("id", "No es un ID Válido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  obtenerCategoria
);

// Crear categoria - privado - con token válido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

// Actualizar categoria - privado - con token válido
router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  actualizarCategoria
);

/**
 * Borrar categoria - privado - Admin
 */
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID Válido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  eliminarCategoria
);

module.exports = router;
