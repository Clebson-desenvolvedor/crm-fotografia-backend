/**
 * @desc Renderiza um título e uma descrição na index
 */
function getIndex(req, res, next) {
    res.render("index", {
        title: 'Minha Home',
        description: 'Bem-vinda de volta, Alice 😀',
        message: '',
        typeMessage: undefined
    })
}

module.exports = {
    getIndex
}