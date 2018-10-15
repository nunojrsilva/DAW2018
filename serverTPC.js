var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer((req,res)=> {
    res.writeHead(200, {'Content-Type' : 'text/html'})
    var URLObj = url.parse(req.url, true)
    var path = URLObj.pathname
    var array = path.split("/")
    if (array[1] == "index.html" || path == "/") {
        fs.readFile('website/index.html', (erro, dados) => {
            if (!erro)
                res.write(dados)
            else{
                res.writeHead(404,{'Content-Type':'text/html'})
                res.write('<html>\n')
                res.write('<head>\n')
                res.write('<meta charset="utf-8"/>\n')
                res.write('</head>\n')
                res.write('<body>\n')
                res.write('<h1 style=" text-align: center;font-size:50"> Error 404 - Page not found </h1>\n')
                res.write('<h4 style=" text-align: center;">' + erro + '</h4>\n')
                res.write('<h5 style=" text-align: center;"><a href="http://localhost:4003/index.html">(Voltar ao índice)</a></h5>\n')
                res.write('</body>\n')
                res.write('</html>')
                } 
            res.end()
        });
    }
    else if (array[1] == "arquelem") {
        fs.readFile('website/html/' + array[2], (erro, dados) => {
            if (!erro)
                res.write(dados)
            else{
                res.writeHead(404,{'Content-Type':'text/html'})
                res.write('<html>\n')
                res.write('<head>\n')
                res.write('<meta charset="utf-8"/>\n')
                res.write('</head>\n')
                res.write('<body>\n')
                res.write('<h1 style=" text-align: center;font-size:50"> Error 404 - Page not found </h1>\n')
                res.write('<h4 style=" text-align: center;">' + erro + '</h4>\n')
                res.write('<h5 style=" text-align: center;"><a href="http://localhost:4003/index.html">(Voltar ao índice)</a></h5>\n')
                res.write('</body>\n')
                res.write('</html>')
                } 
            res.end()
        });

    }
    else {
        res.writeHead(404,{'Content-Type':'text/html'})
                res.write('<html>\n')
                res.write('<head>\n')
                res.write('<meta charset="utf-8"/>\n')
                res.write('</head>\n')
                res.write('<body>\n')
                res.write('<h1 style=" text-align: center;font-size:50"> Error 404 - Page not found </h1>\n')
                res.write('<h4 style=" text-align: center;"></h4>\n')
                res.write('<h5 style=" text-align: center;"><a href="http://localhost:4003/index.html">(Voltar ao índice)</a></h5>\n')
                res.write('</body>\n')
                res.write('</html>')
                res.end()
    }

}).listen(4003 , () => {
    console.log('Servidor à escuta na porta 4003')
})
