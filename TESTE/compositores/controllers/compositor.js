var Compositor = require('../models/compositor')

//Lista de Eventos

module.exports.listar = () => {
    return Compositor
            .find({},{_id:0, id : 1, nome : 1, dataNasc : 1})
            .exec()

}

module.exports.listarID = id => {
    return Compositor
            .find({id : id})
            .exec()

}

module.exports.listarPeriodo = p => {
    return Compositor
            .find({periodo : p})
            .exec()

}

module.exports.listarPeriodoData = (p,d) => {
    return Compositor
            .find({periodo : p, dataNasc : {$gt : d} })
            .exec()

}

module.exports.inserir = t => {
    return Compositor.create(t)
}