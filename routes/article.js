import express from "express";
import Article from "../models/article.js";
import { verifyToken } from "../middleware/auth.js";

const articleRouter = express.Router();

// ✅ Ajouter un article (Admin uniquement)
articleRouter.post("/", verifyToken, async (req, res) => {
  try {
    const { title, description, price, image } = req.body;
    
    // Vérification des champs requis
    if (!title || !description || !price) {
      return res.status(400).json({ error: "Tous les champs obligatoires doivent être remplis." });
    }

    const article = await Article.create({ title, description, price, image });
    res.status(201).json(article);
  } catch (error) {
    console.error("Erreur lors de la création d'un article:", error);
    res.status(500).json({ error: "Erreur serveur lors de la création de l'article." });
  }
});

// ✅ Voir tous les articles
articleRouter.get("/", async (req, res) => {
  try {
    const articles = await Article.findAll();
    res.json(articles);
  } catch (error) {
    console.error("Erreur lors de la récupération des articles:", error);
    res.status(500).json({ error: "Erreur serveur lors de la récupération des articles." });
  }
});

// ✅ Voir un article spécifique
articleRouter.get("/:id", async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) return res.status(404).json({ error: "Article non trouvé" });
    res.json(article);
  } catch (error) {
    console.error("Erreur lors de la récupération d'un article:", error);
    res.status(500).json({ error: "Erreur serveur lors de la récupération de l'article." });
  }
});

// ✅ Modifier un article (Admin uniquement)
articleRouter.put("/:id", verifyToken, async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) return res.status(404).json({ error: "Article non trouvé" });

    await article.update(req.body);
    res.json(article);
  } catch (error) {
    console.error("Erreur lors de la modification d'un article:", error);
    res.status(500).json({ error: "Erreur serveur lors de la modification de l'article." });
  }
});

// ✅ Supprimer un article (Admin uniquement)
articleRouter.delete("/:id", verifyToken, async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) return res.status(404).json({ error: "Article non trouvé" });

    await article.destroy();
    res.json({ message: "Article supprimé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression d'un article:", error);
    res.status(500).json({ error: "Erreur serveur lors de la suppression de l'article." });
  }
});

export default articleRouter;
