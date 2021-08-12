const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) => {


    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // Leer usuario que corresponda al ID
        const usuario = await Usuario.findById(uid);

        if ( !usuario) {
            return res.status(401).json({
                msg: 'Token no Válido - Usuario no exiate en DB'
            })
        }



        // Verificar si cliente no esta borrado
        if ( !usuario.estado) {
            return res.status(401).json({
                msg: 'Token no Válido - Usuario Elimnado'
            })
        }

        req.usuario = usuario;

        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no Válido'
        })
    }


}

module.exports = {
    validarJWT
}