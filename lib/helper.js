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

function convertToMySql() {
    const date = new Date();
    const year = date.getFullYear()
    const month = date.getMonth() + 1;
    const day = date.getUTCDate();
    return `${year}-${month}-${day}`
}

module.exports = {
    createNameFile,
    convertToMySql
}