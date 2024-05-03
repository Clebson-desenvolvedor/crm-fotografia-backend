const serviceModel = require("../model/service.model.js");
const config = require("../model/config.model.js");

/**
 * @desc Cria um serviço e devolve uma mensagem de erro ou sucesso para o usuário
 * @param {object} req 
 * @return {object}
 */
async function createService(req, res, next) {
    // console.log("Controller createService req.body ", req.body);
    try {
        let service = req.body;
        service = await serviceModel.insertService(service);
        // console.log("Controller createService service ", service['enderecos']);return;
        if (service.errno == 1452) throw new Error("Atenção: Você está tentando criar um serviço para um cliente que não existe. ");
        res.send({ mensagem: "Serviço criado com sucesso!", id: service.insertId });
    } catch (err) {
        console.log("service.controller createService catch err", err);
        next(err);
    }
}

/**
 * @desc Pega os serviços e devolve para o usuário
 * @return {object}
 */
async function getServices(req, res, next) {
    // console.log("service.controller getServices");
    try {
        let services = await serviceModel.getServices();
        let colors = await config.getColors();
        // console.log("service.controller getServices services", services);
        if (services.length == 0) {
            res.render("admin/servicesPage", {
                title: "Meus Serviços",
                mensagem: "Nenhum serviço encontrado. ",
                colors: colors
            });
        } else {
            res.render("admin/servicesPage", {
                title: "Meus Serviços",
                services: services,
                colors: colors
            });
        }
    } catch (err) {
        console.log("service.controller getServices catch err", err);
        next();
    }
}

/**
 * @desc Pega um serviço pelo id e devolve para o usuário
 * @param {number} req
 * @return {object}
 */
async function getService(req, res, next) {
    // console.log("service.controller getService req.params.id", req.params.id);
    try {
        let service = await serviceModel.getService(req.params.id);
        // console.log("service.controller getService service", service);
        if (service.length == 0) {
            res.send({ mensagem: "Nenhum serviço encontrado" });
        } else {
            res.send(service);
        }
    } catch (err) {
        console.log("service.controller getService catch err", err);
        next(err);
    }
}

/**
 * @desc Deleta um serviço pelo id passado como parâmetro e retorna uma mensagem de erro ou sucesso
 * @param {Number} req
 * @return {object}
 */
async function deleteService(req, res, next) {
    // console.log("service.controller deleteService req.params.id", req.params.id);
    try {
        let service = await serviceModel.deleteService(req.params.id);
        // console.log("service.controller deleteService service", service);
        if (service.affectedRows == 0) {
            throw new Error(
                "Ops, parece que você está tentando apagar um serviço que não existe."
            );
        }
        res.send({ mensagem: "Serviço apagado com sucesso!" });
    } catch (err) {
        console.log("service.controller deleteService catch err", err);
        next(err);
    }
}

/**
 * @desc Atualiza um serviço e retorna uma mensagem de erro ou sucesso para o usuário
 * @param {object} req 
 * @return {object}
 */
async function updateService(req, res, next) {
    // console.log("service.controller updateService req.body", req.body);
    try {
        let service = req.body;
        if (
            !service.tiposervico ||
            !service.dtcadservico ||
            !service.preco ||
            !service.statusservico ||
            !service.idcliente
        ) {
            throw new Error("Alguns campos são obrigatórios");
        }
        service = await serviceModel.updateService(service);
        // console.log("service.controller updateService service", service);
        if (service.affectedRows == 0) {
            throw new Error("Ops!, parece que este serviço ainda não foi criado. ");
        }
        res.send({
            mensagem: "Serviço atualizado com sucesso",
        });
    } catch (err) {
        console.log("service.controller updateService catch err", err);
        next(err);
    }
}

module.exports = {
    createService,
    getServices,
    getService,
    deleteService,
    updateService,
};
