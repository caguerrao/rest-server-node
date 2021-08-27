const { response } = require("express");
const { isValidObjectId } = require("mongoose");

const { Usuario, Categoria, Producto} = require("../models");

const colleccionesPermitidas = ["categorias", "roles", "productos", "usuarios"];

const buscarCategorias = async (termino = "", res = response) => {
  const esMongoID = isValidObjectId(termino);

  if (esMongoID) {
    const categoria = await Categoria.findById(termino);
    return res.json({
      results: categoria ? [categoria] : [],
    });
  }

  const regex = new RegExp(termino, "i");

  const categorias = await Categoria.find({nombre: regex, estado : true});

  res.json({
    results: categorias,
  });
};

const buscarUsuarios = async (termino = "", res = response) => {
    const esMongoID = isValidObjectId(termino);
  
    if (esMongoID) {
      const usuario = await Usuario.findById(termino);
      return res.json({
        results: usuario ? [usuario] : [],
      });
    }
  
    const regex = new RegExp(termino, "i");
  
    const usuarios = await Usuario.find({
      $or: [{ nombre: regex }, { correo: regex }],
      $ar: [{ estado : true}]
    });
  
    res.json({
      results: usuarios,
    });
  };

  const buscarProductos = async (termino = "", res = response) => {
    const esMongoID = isValidObjectId(termino);
  
    if (esMongoID) {
      const producto = await Producto.findById(termino);
      return res.json({
        results: producto ? [producto] : [],
      });
    }
  
    const regex = new RegExp(termino, "i");
  
    const productos = await Producto.find({
      $or: [{ nombre: regex }, { descripcion: regex }],
      $ar: [{ estado : true}]
    });
  
    res.json({
      results: productos,
    });
  };


const buscar = (req, res = response) => {
  const { coleccion, termino } = req.params;

  if (!colleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las collecciones permitidas son: ${colleccionesPermitidas}`,
    });
  }

  switch (coleccion) {
    case "categorias":
        buscarCategorias(termino, res);
      break;

    case "usuarios":
      buscarUsuarios(termino, res);
      break;

    case "productos":
        buscarProductos(termino, res);
      break;

    default:
      res.status(500).json({
        msg: "Se me olvido hacer esta busqueda",
      });
  }
};

module.exports = {
  buscar,
};
