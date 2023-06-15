/**
 * @desc Renderiza a Home do site
 */
function getIndex(req, res, next) {
    res.render("site/index", {
        title: "Home | By Emotion"
    });
}

/**
 * @desc Renderiza a Galeria do site
 */
function getGalery(req, res, next) {
    res.render("site/galery", {
        title: "Galeria | By Emotion"
    });
}

/**
 * @desc Renderiza a página Sobre do site
 */
function getAbout(req, res, next) {
    res.render("site/about", {
        title: "Sobre | By Emotion"
    });
}

/**
 * @desc Renderiza a página Contato do site
 */
function getContact(req, res, next) {
    res.render("site/contact", {
        title: "Contato | By Emotion"
    });
}

/**
 * @desc Renderiza a página Blog do site
 */
function getBlog(req, res, next) {
    res.render("site/blog", {
        title: "Blog | By Emotion"
    });
}

module.exports = {
    getIndex,
    getGalery,
    getAbout,
    getContact,
    getBlog
}