const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

const {
    validarCampos,
    validarJWT, 
    //esAdminRole, 
    tieneRol
} = require('../middlewares');

const { usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
    
} = require('../controllers/users')

const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');




router.get('/', usuariosGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    //check('role', 'El Rol no es válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom(esRoleValido),
    validarCampos
], usuariosPost);

router.put('/:id', [
    check('id', 'No es un ID Válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosPut);

router.delete('/:id', [
    validarJWT,
    //esAdminRole,
    tieneRol(['ADMIN_ROLE']),
    check('id', 'No es un ID Válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);






module.exports = router;