const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

const { validarCampos } = require('../middlewares/validar-campos');

const { login, googleSignin } = require('../controllers/auth');

router.post('/login', [
        check('correo', 'El correo no es válido').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
] ,login );




/*  GOOGLE SIGN IN */
router.post('/google',[
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    validarCampos
], googleSignin)



module.exports = router;