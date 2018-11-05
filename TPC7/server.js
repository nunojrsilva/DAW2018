var http = require('http')
var express = require("express")
var pug = require('pug')
var fs = require('fs')
var formidable = require("formidable")
var logger = require("morgan")
var jsonfile = require("jsonfile")


var catalogo = "ficheiros.json"

var app = express()

app.use(logger("combined"))

app.use("/uploaded", express.static('uploaded'));


app.get("/w3.css", (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/css'})
    fs.readFile('stylesheets/w3.css', (erro, dados)=>{
        if(!erro) {
            res.write(dados)
            res.end()
        }
        else{
            res.write('<p><b>Erro: </b> ' + erro + '</p>')
            res.end()
        }
        

})})


app.get("/", (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
    jsonfile.readFile(catalogo, (erro, ficheirosAtuais) => {

        if (!erro) {
            res.write(pug.renderFile("form-ficheiro.pug", {ficheiros : ficheirosAtuais}))
            res.end()
           
            
        }

        else {
            res.write(pug.renderFile("erro.pug", {e: "Erro na leitura da base de dados !"}))
            res.end()
        }
    })
   
})



app.post("/processaForm", (req, res) => {
    

    var form = new formidable.IncomingForm()
    form.parse(req, (erro, fields, files) => {
        console.dir(fields)
        console.dir(files)
        var fenviado = files.ficheiro.path
        var fnovo = "./uploaded/" + files.ficheiro.name
        console.log(fenviado)
        console.log(fnovo)

        
        
        fs.rename(fenviado, fnovo, function(err)  {
            if (!err) {

                jsonfile.readFile(catalogo, (erro, ficheirosAtuais) => {

                    if (!erro) {
                        ficheirosAtuais.push({"nome" : files.ficheiro.name, "path" : fnovo, "descricao" : fields.desc, "hora" : getDateTime(), })
                        jsonfile.writeFile(catalogo, ficheirosAtuais)
                        console.dir(ficheirosAtuais)
                        
                    }
        
                    else {
                        res.write(pug.renderFile("erro.pug", {e: "Erro na leitura da base de dados !"}))
                        res.end()
                    }
                })
                
                return res.redirect(301,"/")
            }
            else {
                res.write(pug.renderFile("erro.pug", {e: "Ocorreram erros no armazenamento do ficheiro"}))
                res.end()
            }

        })
    })

})

var myServer = http.createServer(app)


myServer.listen(4007, () => {
    console.log ("Servidor à escuta na porta 4007")
})


function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    return hour + ":" + min + ":" + sec;
}