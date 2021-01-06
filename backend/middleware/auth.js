////////////////////////////////////////////////////////////middlew qui protege les routes et verif authentification/////////////////////////////////////////////////////////////////////////////

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; //extraction du token du header auth//
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); //decodage token//
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      //comparaison id utilisateur et celui du token//
      /////si id utilisateur différent de user id on envoie une erreure////
      throw "Invalid user ID";
    } else {
      ///si tout roule on passe l'exécution///////////////////////////
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};

////ici limiter le nombre de connection //////
