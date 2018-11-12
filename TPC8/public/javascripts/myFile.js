$(document).ready( function() {
    $('#tabela').load("http://localhost:4567/ficheiros")

    $('#adicionar').click( function(e) {
        e.preventDefault()
        var f = $("#ficheiro").val()
        var d = $("#descricao").val()
        if (f && d) {
            ajaxPost()
        }
        else{
            alert("Campos por preencher no formulário!")
        }
    })

    function ajaxPost () {
        var f = new FormData($('#myFileForm')[0])

        $.ajax({
            type : "POST",
            contentType : false,
            processData: false,
            url : "http://localhost:4567/ficheiro/guardar",
            data : f,
            success: function(p) {
                alert ("Ficheiro : " + JSON.stringify(p))
                console.log("Sucesso: " + JSON.stringify(p))
                var desc = $("#descricao").val()
                var nome =  JSON.stringify(p).replace('"',' ').replace('"',' ').trim()
                var html = "<tr><td><a href='/ficheiros/" + nome + "' \> " + nome + "</a></td><td>" + desc + "</td></tr>" 
                $("#tabela").append(html)
                $("#ficheiro").val("")
                $("#descricao").val("")
            },
            error : function(e) {
                alert ("Erro no post :" + e)
                console.log ("Erro no post :" + e)
                $("#ficheiro").val("")
                $("#descricao").val("")
            }
        })
    }
})

