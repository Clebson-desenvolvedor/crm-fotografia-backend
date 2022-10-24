const express = require("express");
const router = express.Router();
const clientController = require("../controllers/client.controller.js");
const serviceController = require("../controllers/service.controller.js");
const indexAdmin = require("../controllers/adminIndex.controller");
const multer = require("multer");
const helper = require("../lib/helper")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, helper.createNameFile(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.get("/", indexAdmin.getIndexAdmin)

//rotas para clientes: adim/clients
router.post("/clients", upload.single('foto_cliente'), clientController.createClient);
router.get("/clients", clientController.getClients);
router.get("/clients/:id", clientController.getClient);
// router.delete("/:id", clientController.deleteClient);
// router.put("/", clientController.updateClient);

//rotad para serviços: admin/services
router.post("/services", serviceController.createService);
router.get("/services", serviceController.getServices);
router.get("/services/:id", serviceController.getService);
// router.delete("/:id", clientController.deleteClient);
// router.put("/", clientController.updateClient);


module.exports = router;
