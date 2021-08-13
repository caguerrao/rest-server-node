const { response } = require("express");
const { Producto } = require("../models");

/**
*  CREAR PRODUCTO 
*/

const crearProducto = async (req, res = response) => {
    const codigo = req.body.codigo.toUpperCase();
    const productoDB = await Producto.findOne({ codigo });
  
    if (productoDB) {
      return res.status(400).json({
        msg: `La producto ${productoDB.codigo} ya existe`,
      });
    }

    console.log(req.body);
  
    // Generar la data a guardar
    const data = {
      codigo,
      descripcion: req.body.descripcion,
      categoria: req.categoria._id,
      usuario: req.usuario._id,
    };
  
    const producto = new Producto(data);
    await producto.save();
  
    res.status(201).json(producto);
  };



//VER PRODUCTO - paginado - total - populs
//VER PRODUCTO - paginado - total - populs
/**
 * ACTUALIZAR PRODUCTO
 */

/**
 * MARCAR CATEORIA COMO ELIMINADA
 */
/*
const obtenerProducto = async (req, res = response) => {
  const { id } = req.params;
  const producto = await Producto.findById(id).populate("usuario", "nombre");

  res.json(producto);
};

const obtenerProductos = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, producto] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find()
      .populate("usuario", "nombre")
      .limit(Number(limite))
      .skip(Number(desde)),
  ]);

  res.json({
    total,
    producto,
  });
};




const actualizarProducto = async (req, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario._id;

  const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

  res.json(producto);

};

 const eliminarProducto = async (req, res = response) => {
  const { id } = req.params;
  
  const productoBorrada = await Producto.findByIdAndUpdate(id,  { estado: false }, { new: true });

  res.json(productoBorrada);
 }*/



module.exports = { crearProducto,

};