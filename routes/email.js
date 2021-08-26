var express = require("express");
var router = express.Router();

const {
    validarCampos,
    
} = require('../middlewares');

const {send} = require('../controllers/emailController');

router.get("/send", send);


module.exports = router;
