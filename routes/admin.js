const express = require("express");
const router = express.Router();
const clientController = require("../controllers/client.controller.js");
const serviceController = require("../controllers/service.controller.js");
const leadController = require("../controllers/lead.controller.js");
const indexAdmin = require("../controllers/adminIndex.controller");
const multer = require("multer");
const helper = require("../lib/helper");
const config = require("../configuration/config.js");
const user = require("../controllers/user.controller.js");
const { e_admin } = require("../middleware/login.js");

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

//rotas para clientes: admin/clients
router.post("/clients", upload.single('foto_cliente'), clientController.createOrUpdateClient);
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
router.post("/leads", upload.single('foto_lead'), leadController.createOrUpdateLead);
router.get("/leads", leadController.getLeads);
router.get("/leads/:id", leadController.getLead);
router.post("/leads/:id", leadController.deleteLead);

//rotas para a configuração: admin/configurations
router.get("/configurations", config.getConfig);

//trás as cores da base configuradas nas views
router.get("/configurations/colors", config.getColors);
router.post("/configurations/colors", config.updateColors);

router.get("/login", user.login);
router.post("/login", user.loginUser);

module.exports = router;
