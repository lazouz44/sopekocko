/////////////////////////////////////////////////////////////////////////////GESTION OPERATIONS CRUD POUR SAUCES///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Thing = require("../models/Thing");
const fs = require("fs"); ///package systeme de fichier de node acces aux fct pour modif,supprettion///////////

///////////////////////////////////////////////////////////////////////enregistrement création d'une sauce///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//??sauce  usersliked et usersdisliked aux tableaux vident???////
exports.createThing = (req, res, next) => {
  console.log(req);
  const thingObject = JSON.parse(req.body.sauce);
  //on doit transformer la chaine en objet///
  delete thingObject._id;
  const thing = new Thing({
    likes: 0,
    dislikes: 0,
    usersliked: [],
    usersdisliked: [],
    ...thingObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      ////récupération segment de lurl ou se trouve limage , get host resout lhote du serveur localhost 3000 req protocol = http/////
      req.file.filename
    }`,
  });
  thing
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée !" }))
    .catch((error) => res.status(400).json({ error }));
};

///////////////////////////////////////////////////////////////////////////Récupération d'une seule sauce avec id fourni ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.getOneThing = (req, res, next) => {
  Thing.findOne({
    _id: req.params.id,
  })
    .then((thing) => {
      res.status(200).json(thing);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

///////////////////////////////////////////////////////////////////////////ternaire a ton recu un nouveau fichier ou non pour modification?Mise a jour de la sauce avec id fourni////////////////////////////////////////////////////////////////////////////////////////
exports.modifyThing = (req, res, next) => {
  const thingObject = req.file //nouvelle image//
    ? {
        ...JSON.parse(req.body.thing), //récup infos sur lobjet//
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          //on genere la nouvelle image url//
          req.file.filename ///// si req file existe on traite la nouvelle image///
        }`,
      }
    : { ...req.body }; //// sinon on traite l'objet entrant, ////
  Thing.updateOne(
    /// on mofif id de l'objet//
    { _id: req.params.id },
    { ...thingObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
    .catch((error) => res.status(400).json({ error }));
};

//////////////////////////////////////////////////////////////////////////////////////pour supprimer sauce/////////////////////////////////////////////////////////////////////////////////////////////
exports.deleteThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id }) // id comme parametre pr acceder au thong correspondant//
    .then((thing) => {
      const filename = thing.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        //suppretion du fichier et callback  executer qd fichier sup//
        Thing.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

////////////////////////////////////////////////////////////////////////////////////récupe tableau de sauces//////////////////////////////////////////////////////////////////////////////////////
exports.getAllStuff = (req, res, next) => {
  Thing.find()
    .then((things) => {
      res.status(200).json(things);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

///créa fct likeThings  définit le statut jaime pour userID fourni/////
//si jaime= 1 user aime la sauce
///si jaime =0 user annule ce quil aime ou ce quil naime pas
//si jaime= -1 user naime pas
//id utilisateur doit etre ajouté ou supprimé du tableau
//il faut garder une trace de ses préférences
//lempecher daimer ou non la meme sauce plusieurs fois
// mise a jour nombre total jaime je naime pas
//corps de la demande userid et jaime réponse attendue : message
exports.likeSauce = (req, res, next) => {};
