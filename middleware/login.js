const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    console.log('req.session ........................', req.session)
    console.log("middleware: login");
    try {
        const token = req.headers.authorization?.split(" ")[1] || ""; 
        const decode = jwt.verify(token, process.env.JWT_KEY);
        req.user = decode;

        next();
    } catch (error) {
        console.log("middleware: login catch error: ", error.message);
        return res.render("admin/login", { title: "login", status: 401});
    }
}