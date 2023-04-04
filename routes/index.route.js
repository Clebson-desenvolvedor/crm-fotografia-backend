const express = require("express");
const router = express.Router();
const indexController = require("../controllers/index.controller")

router.get("/", indexController.getIndex);
router.get("/galery", indexController.getGalery);
router.get("/about", indexController.getAbout);
router.get("/contact", indexController.getContact);
router.get("/blog", indexController.getBlog);
router.get("/login", indexController.getLogin);

module.exports = router;