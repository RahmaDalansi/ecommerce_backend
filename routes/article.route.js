const express = require("express");
const Article = require("../models/article");
const router = express.Router();

router.post("/", async (req, res) => {
    const art1 = new Article(req.body);
    try {
        await art1.save();
        res.status(200).json(art1);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// afficher la liste des articles.
router.get('/', async (req, res) => {
    try {
        const art = await Article.find();
        res.status(200).json(art);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// afficher un article by id.
router.get('/:id', async (req, res) => {
    try {
        const art = await Article.findById(req.params.id).populate("scategoriID");
        res.status(200).json(art);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// modifier un article
router.put('/:id', async (req, res) => {
    try {
        const art1 = await Article.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(art1);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Supprimer un article
router.delete('/:id', async (req, res) => {
    try {
        await Art.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Article deleted successfully." });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = router;
