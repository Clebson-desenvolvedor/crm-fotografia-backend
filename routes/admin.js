const express = require("express");
const router = express.Router();
const clientController = require("../controllers/client.controller.js");
const serviceController = require("../controllers/service.controller.js");
const leadController = require("../controllers/lead.controller.js");
const multer = require("multer");
const helper = require("../lib/helper");
const configController = require("../controllers/config.controller.js");
const user = require("../controllers/user.controller.js");
// const login = require("../middleware/login.js");
const auth = require("../middleware/auth.js");
// const dashboardController = require("../controllers/dash.controller.js");
// const toolsController = require("../controllers/tool.controller.js");
const dataController = require("../controllers/data.controller.js");

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
router.post("/clients", auth, clientController.createOrUpdateClient);
router.get("/clients", clientController.getClients);
router.get("/clients/:id", auth, clientController.getClient);
router.post("/clients/:id", auth, clientController.deleteClient);
router.get("/nomesclientes", auth, clientController.getClientsName);
router.post("/photoclient/:id", auth, upload.single("foto_cliente"), clientController.uploadPhotoClient);

// rotas para serviços: admin/services
router.post("/services", auth, serviceController.createService);
router.get("/services", auth, serviceController.getServices);
router.get("/services/:id", auth, serviceController.getService);
// router.delete("/:id", clientController.deleteClient);
// router.put("/", clientController.updateClient);

// //rotas para leads: admin/leads
router.post("/leads", auth, upload.single("foto_lead"), leadController.createOrUpdateLead);
router.get("/leads", auth, leadController.getLeads);
router.get("/leads/:id", auth, leadController.getLead);
router.post("/leads/:id", auth, leadController.deleteLead);

// rotas para a configuração: admin/configurations
router.get("/configurations", configController.getConfig);

// // rotas para a ferramentas: admin/tools
// router.get("/tools", login, toolsController.getTools);

// // rotas para o dashboard

// /** Rota para buscar cores preferenciais */
router.get("/colors", dataController.getColors);

module.exports = router;
