const { request, response, query } = require("express");
const bcryptjs = require("bcryptjs");
const {
  subidaImagenCloudinary,
  actualizarImagenCloudinary,
  eliminarImagenCloudinary,
} = require("./subidasController");
const { Excursion, User, excursionVendida } = require("../models");

const excursionGet = async (req = request, res = response) => {
  const [total, excursiones] = await Promise.all([
    Excursion.countDocuments(),
    Excursion.find(),
  ]);

  res.status(200).send({
    total: total,
    excursiones: excursiones,
  });
};

const excursionGetUltimas = async (req = request, res = response) => {
  const [total, excursiones] = await Promise.all([
    Excursion.countDocuments({vendida:false}),
    Excursion.find({vendida:false}).sort({ createdAt: -1 }).limit(Number(12)),
  ]);

  res.status(200).send({
    total: total,
    excursiones: excursiones,
  });
};

const excursionGetById = async (req = request, res = response) => {
  const { ID } = req.query;
  const excursion = await Excursion.findById(ID);

  res.status(200).send({
    excursion: excursion,
  });
};

//Agregar excursion
const excursionPost = async (req, res = response) => {
  try {
    const { ...data } = req.body;
    let urlImage = "";
    if(req.body.img){
      urlImage = req.body.img;
    }
    if (req.files != null) {
      urlImage = await subidaImagenCloudinary(req.files.archivo);
    }
    const excursion = new Excursion(data);
    excursion.img = urlImage;

    
    // Guardar en BD
    const resExcursion = await excursion.save();

    res.status(201).send({
      excursion: excursion,
      msg: "excursion creada correctame",
    });
  } catch (e) {
    console.log(e)
    res.status(400).send({ msg: "Ha ocurrido un error al adicionar" });
  }
};

//Editar o Actualizar excursion
const excursionPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, ...resto } = req.body;

  try {
    //Buscar y actualizar
    //const planta = await Planta.findByIdAndUpdate(id, resto);
    const excursion = await Excursion.findById(id);
    if (req.files != null) {
      const urlImg = await actualizarImagenCloudinary(
        req.files.archivo,
        excursion.img
      );
      resto.img = urlImg;
    }
    //actualiza la fecha de actualización
    resto.updatedAt = Date.now();

    await excursion.update(resto);

    res.status(200).send({
      excursion: excursion,
      msg: "Excursion Actualizada Correctame",
    });
  } catch (e) {
    res.status(400).send({ msg: "Ha ocurrido un error en la actualizacón" });
  }
};

//Eliminar excursion
const excursionDelete = async (req, res = response) => {
  const { id } = req.params;

  try {
    //Fisicamente lo borramos
    const resp = await Excursion.findByIdAndRemove(id);
    eliminarImagenCloudinary(resp.img);

    res.status(200).send({ msg: "excursion eliminada correctamente" });
  } catch (e) {
    res.status(400).send({ msg: "Ha ocurrido un error en la eliminación" });
  }
};

/*
const excursionBuscar = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  try {
    const [total, excursions] = await Promise.all([
      Excursion.countDocuments(req.body),
      Excursion.find(req.body).skip(Number(desde)).limit(Number(limite)),
    ]);

    res.status(200).send({
      total: total,
      excursions: excursions,
    });
  } catch (e) {
    res.status(400).send({
      Error: e,
    });
  }
};

const excursionVender = async (req, res = response) => {
  const { id } = req.params;
  const { precioVenta } = req.body;
  try {
    const resexcursion = await Excursion.findById(id);
    resExcursion.vendida = true;
    await resExcursion.save();
    const comision = (precioVenta * 5) / 100;

    const data = {
      excursion: id,
      precioVenta,
      comision,
    };
    const excursionVendida = new excursionVendida(data);
    await excursionVendida.save();

    res.status(200).send({ excursionVendida });
  } catch (e) {
    res.status(400).send({ msg: "Error", e });
  }
};
*/
module.exports = {
  excursionPost,
  excursionGet,
  excursionPut,
  excursionDelete,
  excursionGetById,
  //excursionBuscar,
  excursionGetUltimas,
  //excursionVender,
};
