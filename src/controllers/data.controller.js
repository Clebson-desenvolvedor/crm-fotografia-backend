const config = require("../model/config.model.js");

async function getColors(req, res, next) {
    try {
        const colors = await config.getColors();

        res.send(colors);
    } catch (error) {
        console.log("Controller getColors catch error: ", error);
    }
}

module.exports = {
    getColors
}