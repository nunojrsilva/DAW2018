var mongoose = require('mongoose')

var Schema = mongoose.Schema

var Compositor = new Schema({
    id: {type: String, required : true},
    nome: {type: String, required: true},
    bio : {type: String, required: true},
    dataNasc : {type: String, require: true},
    dataObito : {type: String, require: true},
    periodo : {type: String, require: true}

    

})

module.exports = mongoose.model('Compositor', Compositor, 'compositores')

