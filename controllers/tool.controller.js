async function getTools (req, res, next) {
    try {
        res.render("admin/toolsPage", {
            title: "Tela de Ferramentas"
        });
    } catch (error) {
        
    }
}

module.exports = {
    getTools
}