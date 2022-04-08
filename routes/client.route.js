const express = require("express");
const router = express.Router();
const clientController = require("../controllers/client.controller.js");

router.post("/", clientController.createClient);
router.get("/", clientController.getClients);
router.get("/:id", clientController.getClient);
router.delete("/:id", clientController.deleteClient);
router.put("/", clientController.updateClient);



module.exports = router;
