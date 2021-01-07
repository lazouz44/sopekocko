//////////////////////////////////////////////////////////shéma de données pour chaque objet thing (sauce) corrrespond à une sauce mis en vente////////////////////////////////////////////////////

const mongoose = require("mongoose"); // on utilise la fonction schema de  mongoose //

const sauceSchema = mongoose.Schema({
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  mainPepper: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number },
  dislikes: { type: Number },
  usersLiked: [{ type: String }],
  usersDisliked: [{ type: String }],
});

module.exports = mongoose.model("Sauce", sauceSchema);
///export du shéma , le rend dispo pour appli express//
