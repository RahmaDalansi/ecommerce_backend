const express = require("express");
const Scategorie = require("../models/scategorie");
const router = express.Router();



router.post("/", async (req, res) => {
    const scat1 = new Scategorie(req.body);
    try {
        await scat1.save();
        res.status(200).json(scat1);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// afficher la liste des sous-catégories.
router.get('/', async (req, res) => {
    try {
        const scat = await Scategorie.find({}, null, {sort:{'_id':-1}}).populate("caregorieID");
        res.status(200).json(scat);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// afficher un item by id.
router.get('/:id', async (req, res) => {
    try {
        const scat = await Scategorie.findById(req.params.id).populate("caregorieID");
        res.status(200).json(scat);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// modifier une sous-catégorie
router.put('/:id', async (req, res) => {
    try {
        const scat1 = await Scategorie.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(scat1);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Supprimer une sous-catégorie
router.delete('/:id', async (req, res) => {
    try {
        await Scategorie.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "sous-catégorie deleted successfully." });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = router;
