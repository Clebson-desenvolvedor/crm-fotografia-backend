/**
 * @desc Renderiza um título e uma descrição na index
 */
function getIndex(req, res, next) {
    res.render("index", {
        title: 'Minha Home',
        description: 'Aqui será a index do site',
        message: '',
        typeMessage: undefined
    })
}

module.exports = {
    getIndex
}