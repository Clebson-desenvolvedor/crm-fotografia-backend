/**
 * @desc Renderiza a Home do site
 */
function getIndex(req, res, next) {
    res.render("site/index");
}

/**
 * @desc Renderiza a Galeria do site
 */
function getGalery(req, res, next) {
    res.render("site/galery")
}

/**
 * @desc Renderiza a página Sobre do site
 */
function getAbout(req, res, next) {
    res.render("site/about")
}

/**
 * @desc Renderiza a página Contato do site
 */
function getContact(req, res, next) {
    res.render("site/contact")
}

/**
 * @desc Renderiza a página Blog do site
 */
function getBlog(req, res, next) {
    res.render("site/blog")
}

/**
 * @desc Vai para página de login
 */
function getLogin(req, res, next) {
    res.render("site/login")
}

module.exports = {
    getIndex,
    getGalery,
    getAbout,
    getContact,
    getBlog,
    getLogin
}