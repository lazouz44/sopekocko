///////////////////////////////////////////////////////////////////////LOGIQUE ROUTE STUFF Enregistrement des routes dans appli express////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////creation d'un routeur express, importation du middleware en argument des routes pour protection/////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////6 ROUTES THING SAUCE///////////////////////////////////////////////////////////////////////////////////////
const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config"); //package qui permet de gérer les fichiers entrants//
const stuffCtrl = require("../controllers/stuff");

router.get("/", auth, stuffCtrl.getAllStuff);
router.post("/", auth, multer, stuffCtrl.createThing);
router.post("/:id/like", auth, stuffCtrl.likeSauce);
router.get("/:id", auth, stuffCtrl.getOneThing);
router.put("/:id", auth, multer, stuffCtrl.modifyThing);
router.delete("/:id", auth, stuffCtrl.deleteThing);

module.exports = router;

/////"/" mettre /api/things  //////
