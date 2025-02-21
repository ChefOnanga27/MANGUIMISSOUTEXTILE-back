import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/utilisateur.js";

const router = express.Router();

// Inscription admin
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashedPassword });
  res.status(201).json(user);
});

// Connexion admin
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Identifiants invalides" });
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "24h" });
  res.json({ token });
});

export default router;
