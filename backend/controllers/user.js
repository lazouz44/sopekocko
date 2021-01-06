////////////////////////////////////////////////////fonction sign up avec package bcrypt qui enregistre utilisateur dans base de données avec email et mdp/////////////////////////////////////////////////
const bcrypt = require("bcrypt"); //package de chiffrement,saler et hasher le mdp avt de lenregistrer dans base de donnée//
const User = require("../models/Users");
const jwt = require("jsonwebtoken");
//fourni jeton d'utilisation aléatoire et vérifiable par le back a chaque session de connect du user//

exports.signup = (req, res, next) => {
  //utiliser regex?//
  bcrypt
    .hash(req.body.password, 10) //mdp salé 10 fois pour sécurité//
    .then((hash) => {
      const user = new User({
        // promesse dun hash généré, créa utilisateur//
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

/////////////////////////////////////////////////////////vérification info d'identification des utilisateurs pour connection///////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////verification requete avec token ////////////////////////////////////////////////////////////////////////////////////////////////
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password) //comparaison mdp utilisateur et hash de la base de donnée//
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h", //fct sign pour encoder nouveau token//
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
