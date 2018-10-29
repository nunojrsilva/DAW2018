var http = require('http')
var url = require('url')
var pug = require('pug')
var fs = require('fs')
var jsonfile = require('jsonfile')
var {parse} = require('querystring')


var myBD = "tarefas.json"

var myServer = http.createServer((req,res) => {
    var purl = url.parse(req.url, true)
    //var query = purl.query

    console.log("Recebi pedido " + purl.pathname)
    console.log("Com o método " + req.method)

    if (req.method == "GET") {

        if(purl.pathname == "/") {
            jsonfile.readFile(myBD, (erro, tarefas) => {

                if (!erro) {
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(pug.renderFile("index.pug", {lista: tarefas}))
                    res.end()
                }

                else {
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(pug.renderFile("erro.pug", {e: "Erro na leitura da base de dados !"}))
                    res.end()
                }
            })
        }

        else if(purl.pathname == "/registo") {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.write(pug.renderFile("form-tarefa.pug"))
            res.end()
        }

        else if(purl.pathname.startsWith("/apagar")) {
            var tar = purl.pathname.split("/")[2]
            jsonfile.readFile(myBD, (erro, tarefas) => {

                if (!erro) {
                    resultado = tarefas[tar]
                    resultado["estado"] = "apagada"
                    console.dir(tarefas)

                    jsonfile.writeFile(myBD, tarefas, erro => {
                        if (erro) console.log(erro)
                        else console.log("Registo gravado com sucesso!")
                    })

                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(pug.renderFile("tarefa-apagada.pug"))
                    res.end()
                }
                else {
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(pug.renderFile("erro.pug", {e: "Erro na leitura da base de dados !"}))
                    res.end()
                }
            })

        }

        else if(purl.pathname.startsWith("/tarefa")) {
            var id = purl.pathname.split("/")[2]
            jsonfile.readFile(myBD, (erro, tarefas) => {

                if (!erro) {
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(pug.renderFile("tarefa.pug", {tarefa: tarefas[id], id : id}))
                    res.end()
                }
                else {
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(pug.renderFile("erro.pug", {e: "Erro na leitura da base de dados !"}))
                    res.end()
                }
            })

        }
    
        else if (purl.pathname == "/w3.css") {
            res.writeHead(200, {'Content-Type': 'text/css'})
            fs.readFile('stylesheets/w3.css', (erro, dados) => {
                if(!erro)
                    res.write(dados)
                else
                    res.write('<p><b>Erro: </b> ' + erro + '</p>')
                res.end()   
            })
        }
    
        else {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.write(pug.renderFile("erro.pug", {e: "Erro: " + purl.pathname + " não está implementado!"}))
            res.end()
    
        }
    }
    else if (req.method == "POST") {

        if (purl.pathname == "/processaForm") {
            recuperaInfo(req, resultado => {
                jsonfile.readFile(myBD, (erro, tarefas) => {
                    if (!erro) {
                        resultado["estado"] = "ativa"
                        tarefas.push(resultado)
                        console.dir(tarefas)
                        jsonfile.writeFile(myBD, tarefas, erro => {
                            if (erro) console.log(erro)
                            else console.log("Registo gravado com sucesso!")
                        })
                    }
                })
                console.log("Info recebida " + JSON.stringify(resultado))
                res.end(pug.renderFile("tarefa-recebida.pug", {tarefa: resultado}))
            })
        }
        else {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.write(pug.renderFile("erro.pug", {e: "URL: " + req.url + " não está implementado!"}))
            res.end()
            
        }
    }

    else {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.write(pug.renderFile("erro.pug", {e: "Método: " + req.method + " não está implementado!"}))
            res.end()

    }

    
})

myServer.listen(4006, () => {
    console.log ("Servidor à escuta na porta 4006")
})


function recuperaInfo (request, callback) {
    if (request.headers["content-type"] === "application/x-www-form-urlencoded") {
        let body = ""
        request.on("data", bloco => {
            body += bloco.toString()
        })
        request.on("end", () => {
            //Aqui inserir o novo campo, talvez ...
            callback(parse(body))
        })

    }
    else callback(null)
}