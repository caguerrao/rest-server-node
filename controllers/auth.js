const { response } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try {

        // Verificar si email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario o Contraseña incorrectas'
            });
        }

        // Verificar si usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario o Contraseña incorrectas'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario o Contraseña incorrectas'
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el Adminstrador'
        })
    }


}


/*  GOOGLE SIGN IN */
const googleSignin = async (req, res = response) => {

    const { id_token } = req.body;

    try {

        const { correo, nombre, img } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            // Se crea
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true
            };

            usuario = new Usuario(data);
            await usuario.save();
        }

        //Si usuario esta marcado como borrado
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el Administrador, usuario bloqueado'
            })
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id);




        res.json({
           usuario,
           token
        });

    } catch (error) {

        res.status(400).json({
            msg: 'Token de Google no es válido'
        })
    }

}


module.exports = {
    login,
    googleSignin
}