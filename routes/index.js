var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Despliegue' });
});

router.get('/detalles', (req, res) => { res.render('detalles_excursion', { id: req.query.ID })})

module.exports = router;
