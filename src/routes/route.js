const express = require("express");
const router = express.Router();
const clientController = require("../controllers/client.controller.js");
const serviceController = require("../controllers/service.controller.js");
const leadController = require("../controllers/lead.controller.js");
const multer = require("multer");
const helper = require("../lib/helper.js");
const configController = require("../controllers/config.controller.js");
const user = require("../controllers/user.controller.js");
const auth = require("../middleware/auth.js");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/img/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, helper.createNameFile(file.originalname));
    }
});

const upload = multer({ storage: storage });

// rotas para login e logout
router.get("/login", user.login);
router.post("/login", user.loginUser);
router.post("/logout", user.logout);

// rotas para clientes: admin/clients
router.post("/clients", clientController.createOrUpdateClient); // precisa refatorar para ter uma rota de criar e outra pr aatualizar.
router.get("/clients", clientController.getClients);
router.get("/clients/:id", clientController.getClient);
router.post("/clients/:id", clientController.deleteClient);
router.post("/photoclient/:id", upload.single("foto_cliente"), clientController.uploadPhotoClient);

// rotas para serviços: admin/services
router.post("/services", serviceController.createService);
router.get("/services", serviceController.getServices);
router.get("/services/:id", serviceController.getService);

// //rotas para leads: admin/leads
router.post("/leads",  upload.single("foto_lead"), leadController.createOrUpdateLead);
router.get("/leads",  leadController.getLeads);
router.get("/leads/:id",  leadController.getLead);
router.post("/leads/:id",  leadController.deleteLead);

// rotas para a configuração: admin/configurations
router.get("/configurations", configController.getConfig);

module.exports = router;
