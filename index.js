import express from "express";
import sequelize from "./config/database.js";
import cors from "cors";
import bodyParser from "body-parser";
import articleRouter from "./routes/article.js";
import commentaireRoutes from "./routes/commentaire.js";
import authRoutes from "./routes/Auth.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

app.use("/articles", articleRouter);
app.use("/commentaires", commentaireRoutes);
app.use("/auth", authRoutes);

sequelize.sync().then(() => console.log("Base de données synchronisée"));

app.listen(5000, () => console.log("Serveur lancé sur http://localhost:5000"));
