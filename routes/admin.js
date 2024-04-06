const express = require("express");
const router = express.Router();
const clientController = require("../controllers/client.controller.js");
const serviceController = require("../controllers/service.controller.js");
const leadController = require("../controllers/lead.controller.js");
const multer = require("multer");
const helper = require("../lib/helper");
const configController = require("../controllers/config.controller.js");
const user = require("../controllers/user.controller.js");
const { e_admin } = require("../middleware/login.js"); /** Por enquanto não está em uso */
const dashboardController = require("../controllers/dash.controller.js");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/img/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, helper.createNameFile(file.originalname));
    }
});

const upload = multer({ storage: storage });

//rotas para clientes: admin/clients
router.post("/clients", upload.single("foto_cliente"), clientController.createOrUpdateClient);
router.get("/clients", clientController.getClients);
router.get("/clients/:id", clientController.getClient);
router.post("/clients/:id", clientController.deleteClient);

//rotas para serviços: admin/services
router.post("/services", serviceController.createService);
router.get("/services", serviceController.getServices);
router.get("/services/:id", serviceController.getService);
// router.delete("/:id", clientController.deleteClient);
// router.put("/", clientController.updateClient);

//rotas para leads: admin/leads
router.post("/leads", upload.single("foto_lead"), leadController.createOrUpdateLead);
router.get("/leads", leadController.getLeads);
router.get("/leads/:id", leadController.getLead);
router.post("/leads/:id", leadController.deleteLead);

//rotas para a configuração: admin/configurations
router.get("/configurations", configController.getConfig);

// rotas para login
router.get("/login", user.login);
router.post("/login", user.loginUser);

// rotas para o dashboard
router.get("/", dashboardController.getData);
router.get("/dashboard", dashboardController.getData);

module.exports = router;
