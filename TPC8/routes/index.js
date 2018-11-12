var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile')
var formidable = require('formidable')
var fs = require('fs')

var myBD = __dirname + '/files.json'

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index')
});

router.get('/ficheiros', (req, res) => {
  jsonfile.readFile(myBD, (erro, ficheiros) => {
    if (!erro) {
      res.render('lista', {lista : ficheiros})
    }
    else res.render('error', {e : erro})
  })

})


router.post('/ficheiro/guardar' , (req,res) => {

  //Form
  var form = new formidable.IncomingForm()

  form.parse(req, (erro, fields, files) => {

    if (!erro) {
     
      var fenviado = files.ficheiro.path
      var fnovo = __dirname + '/../public/ficheiros/' + files.ficheiro.name

      jsonfile.readFile(myBD, (erro, ficheiros) => {
        if(!erro){

          var novoficheiro = {}
          novoficheiro.nome = files.ficheiro.name
          novoficheiro.descricao = fields.descricao
            
            ficheiros.push(novoficheiro)

            jsonfile.writeFile(myBD, ficheiros, erro =>{
                if(erro) {
                    res.status(500)
                    res.write('Erro na escrita na BD: ' + erro)
                    res.end()
                }

                else {
                    fs.rename(fenviado, fnovo, (erro) => {
                      if(!erro){
                          console.log('Registo gravado com sucesso!')
                          res.send(novoficheiro.nome)
                      }
                      else{
                          res.status(500);
                          res.write('Ocorreram erros no armazenamento do ficheiro: ' + erro);
                          res.end();
                      }
                    })
                }
            })

        }
        else{
            res.status(500)
            res.write('Erro na leitura da BD: ' + erro)
            res.end()
        }
    })
    }
  })
  
})

module.exports = router;
