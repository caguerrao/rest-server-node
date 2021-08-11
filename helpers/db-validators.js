const Role = require('../models/rol');
const Usuario = require('../models/usuario');


const esRoleValido = async (role = '') => {
    const existeRole = await Role.findOne({ role });
    if (!existeRole) {
        throw new Error(`El rol ${role} no está registrado en la BD`);
    }
}

const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
       throw new Error(`El correo ${ correo }, ya está registrado`);
    }
}

const existeUsuarioPorId = async ( id ) => {
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
       throw new Error(`El id ${ id } no existe`);
    }
}




    module.exports = {
        esRoleValido,
        emailExiste,
        existeUsuarioPorId
    }