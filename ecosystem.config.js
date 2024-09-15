module.exports = {
    apps: [{
        name: "projeto-alice",
        script: "server.js",
        env: {
            NODE_ENV: "development",
            HOST: "localhost",
            USER: "root",
            PASSWORD: "",
            DATABASE: "fotografia-crm"
        },
        env_production: {
            NODE_ENV: "production",
            HOST: "191.252.205.248",
            USER: "userfoto",
            PASSWORD: "bcs6f12",
            DATABASE: "fotografia-crm"
        }
    }]
};
  
  