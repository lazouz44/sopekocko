/////////////////////////////////////////////////////////////////////contient server node//////////////////////////////////////////////////////////////////////////////////////////////////////////

const http = require("http");
const app = require("./app");

const normalizePort = (val) => {
  //envoie un port valide//
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || "3000");
app.set("port", process.env.PORT || 3000);

const errorHandler = (error) => {
  //recherche les erreurs et les gere//
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app); //fct appellée a chaque requetes//

server.on("error", errorHandler);
server.on("listening", () => {
  ////consigne le port nommé////
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

server.listen(process.env.PORT || 3000); //ecoute les requetes//
