const http = require("http");
const routes = require("./sample.js");

const server = http.createServer(routes);

server.listen(3000);
