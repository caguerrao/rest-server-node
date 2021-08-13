const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearProducto,
  
} = require("../controllers/productos");
const { existeProductoPorId } = require("../helpers/db-validators");
const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");

const router = Router();



/**
 * {{url}}/api/productos
 */

/**
 *  Crear producto - privado - con token válido
 */
 router.post("/",
 [
   validarJWT,
   check("codigo", "El codigo es obligatorio").not().isEmpty(),
   check("descripcion", "La descripcion es obligatoria").not().isEmpty(),
   validarCampos,
 ],
 crearProducto
);



// Obtener todas las productos - público
//router.get("/", obtenerProductos);




// Obtener una producto por id - público
/*router.get(
  "/:id",
  [
    check("id", "No es un ID Válido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  obtenerProducto
);*/




// Actualizar producto - privado - con token válido
/*router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  actualizarProducto
);

/**
 * Borrar categoria - privado - Admin
 */
/*router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID Válido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  eliminarProducto
);*/

module.exports = router;
