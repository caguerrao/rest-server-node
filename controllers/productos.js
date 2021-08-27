const { response } = require("express");
const { Producto } = require("../models");

const crearProducto = async (req, res = response) => {

 const { estado, usuario, ...body } = req.body;


  const productoDB = await Producto.findOne({ codigo: body.codigo });

  if (productoDB) {
    return res.status(400).json({
      msg: `El producto ${productoDB.codigo} ya existe`,
    });
  }


  // Generar la data a guardar
  const data = {
    ...body,
    codigo: body.codigo.toUpperCase(),
    //categoria: req.categoria._id,
    usuario: req.usuario._id,
  };

  const producto = new Producto(data);
  await producto.save();

  res.status(201).json(producto);
};


const obtenerProducto = async (req, res = response) => {
  const { id } = req.params;
  const producto = await Producto.findById(id)
  .populate("usuario", "nombre")
  .populate("categoria", "nombre");
  

  res.json(producto);
};

const obtenerProductos = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, productos] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find()
      .populate("usuario", "nombre")
      .populate("categoria","nombre")
      .limit(Number(limite))
      .skip(Number(desde)),
  ]);

  res.json({
    total,
    productos,
  });
};

const actualizarProducto = async (req, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  if (data.codigo){
    data.codigo = data.codigo.toUpperCase();
  }

  data.usuario = req.usuario._id;

  const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

  res.json(producto);
};

const eliminarProducto = async (req, res = response) => {
  const { id } = req.params;

  const productoBorrada = await Producto.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json(productoBorrada);
};

module.exports = {
  crearProducto,
  obtenerProducto,
  obtenerProductos,
  actualizarProducto,
  eliminarProducto
};
