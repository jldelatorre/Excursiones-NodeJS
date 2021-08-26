const { Schema, model, Types } = require("mongoose");

const excursionSchema = new Schema({
  title: {
    type: String,
    required: [true, "El titlulo es obligatorio"],
    index: true,
  },
  
  img: [{ type: String }],

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },

  description: {
    type: String,
  },

  precio: { type: Number },
 
});
excursionSchema.methods.toJSON = function () {
  const { __v, ...excursion } = this.toObject();
  //se modifica para q salga en los datos en vez de _id salga uid

  return excursion;
};
//Export the model
module.exports = model("Excursion", excursionSchema);
