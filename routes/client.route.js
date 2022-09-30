const express = require("express");
const router = express.Router();
const clientController = require("../controllers/client.controller.js");
const multer = require("multer");
const helper = require("../lib/helper")

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, helper.createNameFile(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post("/", upload.single('foto_cliente'), clientController.createClient);
router.get("/", clientController.getClients);
// router.get("/:id", clientController.getClient);
// router.delete("/:id", clientController.deleteClient);
// router.put("/", clientController.updateClient);

module.exports = router;
