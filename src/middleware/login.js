const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    console.log("middleware: login");
    try {
        const token = req.headers.authorization?.split(" ")[1] || ""; 
        const decode = jwt.verify(token, "segredo");
        req.user = decode;

        next();
    } catch (error) {
        console.log("middleware: login catch error: ", error.message);
        return res.render("admin/login", { title: "login", status: 401});
    }
}