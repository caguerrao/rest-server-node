const { response } = require("express");
const { Categoria } = require("../models");

//VER CATEGORIA - paginado - total - populs
const obtenerCategoria = async (req, res = response) => {
  const { id } = req.params;
  const categoria = await Categoria.findById(id).populate("usuario", "nombre");

  res.json(categoria);
};

//VER CATEGORIA - paginado - total - populs
const obtenerCategorias = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, categoria] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find()
      .populate("usuario", "nombre")
      .limit(Number(limite))
      .skip(Number(desde)),
  ]);

  res.json({
    total,
    categoria,
  });
};

// CREAR CATEGORIA
const crearCategoria = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  const categoriaDB = await Categoria.findOne({ nombre });

  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre} ya existe`,
    });
  }

  // Generar la data a guardar
  const data = {
    nombre,
    usuario: req.usuario._id,
  };

  const categoria = new Categoria(data);
  await categoria.save();

  res.status(201).json(categoria);
};

/**
 * ACTUALIZAR CATEGORIA
 */
const actualizarCategoria = async (req, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario._id;

  const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

  res.json(categoria);

};

/**
 * MARCAR CATEORIA COMO ELIMINADA
 */
 const eliminarCategoria = async (req, res = response) => {
  const { id } = req.params;
  
  const categoriaBorrada = await Categoria.findByIdAndUpdate(id,  { estado: false }, { new: true });

  res.json(categoriaBorrada);
 }



module.exports = {
  obtenerCategoria,
  obtenerCategorias,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria
};
