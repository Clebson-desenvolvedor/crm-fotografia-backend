/**
 * @desc Renderiza um título e uma descrição na index
 */
function getIndexAdmin(req, res, next) {
    res.render("admin/index", {
        title: 'Minha Home',
        description: 'Aqui será a index da admin',
        message: '',
        typeMessage: undefined
    });
}

module.exports = {
    getIndexAdmin
}