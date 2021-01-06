const express = require("express");
const bodyParser = require("body-parser"); //gérer la demande post du front: on appel le package body parser pour extraire lobjet json utilisable de la demande//
const mongoose = require("mongoose"); // package facilite interactions avec base de données mongodb//
const path = require("path"); //donne acces au chemin de notre systeme de fichiers//

const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/user"); //importation du routeur//

const app = express();

//////////////////////////////////////////////////pour connexion de lapi à la base de donnée ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
mongoose
  .connect(
    "mongodb+srv://elzaz44:Projet2020@cluster0.guqrg.mongodb.net/<dbname>?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

//////////////////////////////////////////////// middleware qui dit oke tt le monde peut acceder à l'api gestion erreur CORS/////////////////////////////////////////////////////////////////////////
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //acces a lapi depuis nomporte quelle origine,rajout dun header a lobject reponse//
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS" //on peu envoyer des requêtes avec ces methodes//
  );
  next();
});

///////////////////////////////////////////////fct json extraction objet json de la demande,pour gerer demande post du front//////////////////////////////////////////////////////////////////////
app.use(bodyParser.json());

//////////////////////////////////////////////enregistrement du routeur///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.use("/api/sauces", stuffRoutes);
app.use("/api/auth", userRoutes);

//////////////////////////////////////////////pour utiliser images on va dans le dossier static images grace a la methode path qui donne le chemin//////////////////////////////////////////////////////////
app.use("/images", express.static(path.join(__dirname, "images")));

///// //////////////////////////////////////////export de l'application pour y acceder depuis autres fichier du projet///////////////////////////////////////////////////////////////////////////
module.exports = app;
