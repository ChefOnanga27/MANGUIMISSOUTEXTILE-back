import express from "express";
import Commentaire from "../models/commentaire.js";
import Article from "../models/article.js";

const commentaireRoutes = express.Router();

// ✅ Ajouter un commentaire à un article
commentaireRoutes.post("/:articleId", async (req, res) => {
  try {
    const { name, message } = req.body;

    // Vérification des champs obligatoires
    if (!name || !message) {
      return res.status(400).json({ error: "Le nom et le message sont obligatoires." });
    }

    const article = await Article.findByPk(req.params.articleId);
    if (!article) return res.status(404).json({ error: "Article non trouvé" });

    const commentaire = await Commentaire.create({ name, message, ArticleId: article.id });
    res.status(201).json(commentaire);
  } catch (error) {
    console.error("Erreur lors de l'ajout d'un commentaire:", error);
    res.status(500).json({ error: "Erreur serveur lors de l'ajout du commentaire." });
  }
});

// ✅ Voir les commentaires d’un article
commentaireRoutes.get("/:articleId", async (req, res) => {
  try {
    const commentaires = await Commentaire.findAll({ where: { ArticleId: req.params.articleId } });
    res.json(commentaires);
  } catch (error) {
    console.error("Erreur lors de la récupération des commentaires:", error);
    res.status(500).json({ error: "Erreur serveur lors de la récupération des commentaires." });
  }
});

export default commentaireRoutes;
