const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const bodyParser = require("body-parser"); //gérer la demande post du front: on appel le package body parser pour extraire lobjet json utilisable de la demande//
const mongoose = require("mongoose"); // package facilite interactions avec base de données mongodb//
const path = require("path"); //donne acces au chemin de notre systeme de fichiers , necessaire pour multer//

const saucesRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user"); //importation du routeur//

const helmet = require("helmet"); //configure entete http lié à la sécurité//

const app = express();
app.use(helmet());

//////////////////////////////////////////////////pour connexion de lapi à la base de donnée ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

mongoose.set("useCreateIndex", true); /*logique pour se connecter à mongodb*/
mongoose /*au niveau de la déclaration de ma BD ,
   utilisation de dotenv pour masquer mes identifiants, 
  création du fichier .env pour stocker ces identifiants d'accés 
  et placement dans .gitignore */
  .connect(process.env.MONGODB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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
app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", userRoutes);

//////////////////////////////////////////////pour utiliser images on va dans le dossier static images grace a la methode path qui donne le chemin//////////////////////////////////////////////////////////
app.use("/images", express.static(path.join(__dirname, "images")));

///// //////////////////////////////////////////export de l'application pour y acceder depuis autres fichier du projet///////////////////////////////////////////////////////////////////////////
module.exports = app;
