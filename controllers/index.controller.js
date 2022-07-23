function getIndex(req, res, next) {
    res.render("../views/index", {
        title: 'Home'
    })
}

module.exports = {
    getIndex
}