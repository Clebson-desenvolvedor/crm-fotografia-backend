const express = require("express");
const router = express.Router();
const dashController = require("../controllers/dash.controller.js");

router.get("/", dashController.getData);

module.exports = router;
