/**
 * @desc Renderiza um título e uma descrição na index
 */
function getIndex(req, res, next) {
    res.render("../views/index", {
        title: 'Minha Home',
        description: 'Bem-vinda de volta, Alice 😀'
    })
}

module.exports = {
    getIndex
}