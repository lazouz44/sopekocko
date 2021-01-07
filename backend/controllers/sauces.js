/////////////////////////////////////////////////////////////////////////////GESTION OPERATIONS CRUD POUR SAUCES///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Sauce = require("../models/Sauce");
const fs = require("fs"); ///package systeme de fichier de node acces aux fct pour modif,supprettion///////////

///////////////////////////////////////////////////////////////////////enregistrement création d'une sauce///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  //on doit transformer la chaine en objet///
  delete sauceObject._id;
  const sauce = new Sauce({
    likes: 0,
    dislikes: 0,
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      ////récupération segment de lurl ou se trouve limage , get host resout lhote du serveur localhost 3000 req protocol = http/////
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce bien enregistrée !" }))
    .catch((error) => res.status(400).json({ error }));
};

///////////////////////////////////////////////////////////////////////////Récupération d'une seule sauce avec id fourni ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

///////////////////////////////////////////////////////////////////////////ternaire a ton recu un nouveau fichier ou non pour modification?Mise a jour de la sauce avec id fourni////////////////////////////////////////////////////////////////////////////////////////
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file //nouvelle image//
    ? {
        ...JSON.parse(req.body.sauce), //récup infos sur lobjet//
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          //on genere la nouvelle image url//
          req.file.filename ///// si req file existe on traite la nouvelle image///
        }`,
      }
    : { ...req.body }; //// sinon on traite l'objet entrant, ////
  Sauce.updateOne(
    /// on mofif id de l'objet//
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Sauce bien modifiée !" }))
    .catch((error) => res.status(400).json({ error }));
};

//////////////////////////////////////////////////////////////////////////////////////pour supprimer sauce/////////////////////////////////////////////////////////////////////////////////////////////
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }) // id comme parametre pr acceder au sauce correspondant//
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        //suppretion du fichier et callback  executer qd fichier sup//
        Sauce.deleteOne({ _id: req.params.id })
          .then(() =>
            res.status(200).json({ message: "Sauce bien supprimée !" })
          )
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

////////////////////////////////////////////////////////////////////////////////////récupe tableau de sauces//////////////////////////////////////////////////////////////////////////////////////
exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then((sauce) => {
      res.status(200).json(sauce);
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

//const userId = req.body.userId
//const like =  req.body.like
//const userLiked =
//const userDisliked =
//if (like = 1){
//sauce.like++
//if(like = -1){
//sauce.like--}
//if (like = 0  && userLiked ?){

// like.splice -1 }
//else if (like = 0  && userDisliked ?){
//dislike.splice -1
//}

//
