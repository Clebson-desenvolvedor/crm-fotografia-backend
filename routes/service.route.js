const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/service.controller.js");

router.post("/", serviceController.createService);
router.get("/", serviceController.getServices);
router.get("/:id", serviceController.getService);
router.delete("/:id", serviceController.deleteService);
router.put("/", serviceController.updateService);

module.exports = router;