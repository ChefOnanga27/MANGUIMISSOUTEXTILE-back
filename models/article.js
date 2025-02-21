import { DataTypes } from "sequelize";
import sequelize from "../config/database.js"; // ✅ Correct


const Article = sequelize.define("Article", {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: true },
});

export default Article;
