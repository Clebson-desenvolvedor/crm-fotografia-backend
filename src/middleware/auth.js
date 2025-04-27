function authMiddleware(req, res, next) {
    console.log("middlwware: authMiddleware");

    if (req.session && req.session.user) {
        next();
    } else {
        console.log("middlwware: authMiddleware userId inexistente", req.session ? req.session : "Sessão não encontrada");
        res.redirect("/admin/login");
    }
}

module.exports = authMiddleware;