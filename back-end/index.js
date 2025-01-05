const { createServer } = require("http");
const strapi = require("@strapi/strapi");

const server = strapi().start();
createServer(server.callback()).listen(process.env.PORT || 3000);
