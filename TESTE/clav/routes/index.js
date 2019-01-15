var express = require('express');
var router = express.Router();

var axios = require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get("http://clav-test.di.uminho.pt/api/classes/nivel/1")
    .then(resposta => res.render('inicial', { dados: resposta.data }))
    .catch(erro => {
      console.log("Erro ao obter classes de nivel 1")
      res.render('error', {error : erro, message : "Erro ao obter classes de nivel 1"})
    })
});


router.get('/classe/:codigo', function(req, res, next) {
  console.log(req.params.codigo)

  axios.get("http://clav-test.di.uminho.pt/api/classes/c" + req.params.codigo)
    .then(resposta => {
      var classe = resposta.data[0]

      axios.get("http://clav-test.di.uminho.pt/api/classes/c" + req.params.codigo + "/descendencia")
        .then(resp => {
          res.render('classe', { classe: classe, descendencia : resp.data })
        })
        .catch(erro => {
          console.log("Erro ao obter descendencia")
          res.render('error', {error : erro, message : "Erro ao obter descendencia"})
    })
      
    })
    .catch(erro => {
      console.log("Erro ao obter classe " + req.params.codigo)
      res.render('error', {error : erro, message : "Erro ao obter classe"})
    })
});

module.exports = router;
