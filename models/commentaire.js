import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Article from "./article.js";

const Commentaire = sequelize.define("Commentaire", {
  name: { type: DataTypes.STRING, allowNull: false },
  message: { type: DataTypes.TEXT, allowNull: false },
});

Commentaire.belongsTo(Article);
Article.hasMany(Commentaire);

export default Commentaire;
