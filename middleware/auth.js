function authMiddleware(req, res, next) {
    console.log("middlwware: authMiddleware");

    if (req.session && req.session.user) {
        next();
    } else {
        console.log("middlwware: authMiddleware userId inexistente", req.session);
        res.redirect("/admin/login");
    }
}

module.exports = authMiddleware;