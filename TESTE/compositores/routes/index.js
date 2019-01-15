var express = require('express');
var router = express.Router();

var Compositor = require('../controllers/compositor')

/* GET home page. */
router.get('/api/compositores', function(req, res, next) {
  console.log(req.query)
  if (req.query.Periodo != null ) {
    if (req.query.data == null) {
      console.log("Vou listar periodo")
      Compositor.listarPeriodo(req.query.Periodo)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).send(erro))
    }
    else {
      console.log("Vou listar data e periodo")
      Compositor.listarPeriodoData(req.query.Periodo, req.query.data)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).send(erro))

    }
  }
  else {
    Compositor.listar()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).send(erro))
  }
  
});




router.get('/api/compositores/:id', function(req, res, next) {
  Compositor.listarID(req.params.id)
  .then(dados => res.jsonp(dados))
  .catch(erro => res.status(500).send(erro))
  
});


module.exports = router;
