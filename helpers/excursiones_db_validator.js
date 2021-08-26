const { Excursion } = require("../models");

const existExcursionesById = async (id) => {
  // Verificar si el correo existe
  const existeExcursion = await Excursion.findById(id);
  if (!existeExcursion) {
    throw new Error(`El id no existe ${id}`);
  }
};

module.exports = { existExcursionesById };
