var express = require("express");
const { check } = require("express-validator");
var router = express.Router();

const {
  validarCampos,
} = require("../middlewares");
const { existCasaById } = require("../helpers/excursiones_db_validator");
const {
  excursionPost,
  excursionGet,
  excursionPut,
  excursionDelete,
  excursionGetById,
  excursionBuscar,
  excursionGetUltimas,
  excursionVender,
} = require("../controllers/casaController");


router.get("/ultimas", excursionGetUltimas);

router.get("/id", excursionGetById);

router.get("/", excursionGet);
//router.post("/buscar", casaBuscar);

router.post(
  "/",
  [
    check("title", "El título es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  excursionPost
);

router.put(
  "/:id",
  [
   
    check("id", "No es un ID válido").isMongoId(),
    validarCampos,
  ],
  excursionPut
);

router.delete(
  "/:id",
  [
    
    check("id", "No es un ID válido").isMongoId(),
    validarCampos,
  ],
  excursionDelete
);

module.exports = router;
