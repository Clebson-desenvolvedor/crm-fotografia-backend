function createNameFile(name) {
    const date = new Date();
    const year = date.getFullYear()
    const month = date.getMonth() + 1;
    const day = date.getUTCDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${year}-${month}-${day}-${hour}${minutes}${seconds}_${name}`;
}

/**
 * Recebe um texto e verifica se for nulo, salva a data atual, mas se for
 * diferente de nulo, trata para poder salvar na base de forma correta
 * 
 * @param {string} dt 
 * @returns {string}
 */
function convertToMySql(dt = null) {
    if (dt != null) {
        if (dt.match(/\d{2}\/\d{2}\/\d{2,4}/)) {
            dt = dt.split("/");
            dt = `${dt[2]}-${dt[1]}-${dt[0]}`;
        } 
    } else {
        const date = new Date();
        const year = date.getFullYear()
        const month = date.getMonth() + 1;
        const day = date.getUTCDate();
        dt = `${year}-${month}-${day}`
    }
    return dt;
}

module.exports = {
    createNameFile,
    convertToMySql
}