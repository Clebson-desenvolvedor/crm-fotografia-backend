const express = require("express");
const router = express.Router();
const configController = require("../controllers/config.controller.js");

router.get("/", configController.getConfig);

module.exports = router;
