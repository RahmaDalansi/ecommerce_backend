const express =require("express")
const Categorie = require("../models/categorie")
const router= express.Router()

router.post("/",async(req,res)=>{
    const cat1= new Categorie(req.body)
    try{
        await cat1.save()
        res.status(200).json(cat1)
    }
    catch (error){
        res.status(404).json({message:error.message})
    }
})
// afficher la liste des categories.
router.get('/', async (req, res) => {
    try{
            const cat= await Categorie.find()
            res.status(200).json(cat)

    } catch (error){
        res.status(404).json({message:error.message})
    }
 });

 // afficher un item by id.
router.get('/:id', async (req, res) => {
    try{
            const cat= await Categorie.findById(req.params.id)
            res.status(200).json(cat)

    } catch (error){
        res.status(404).json({message:error.message})
    }
 });



 // modifier une catégorie 
 router.put('/:id', async (req, res)=> { 
    try { 
        const cat1 = await Categorie.findByIdAndUpdate( 
            req.params.categorieId, 
            { $set: req.body }, 
            { new: true } ); 
        res.status(200).json(cat1); 
    } catch (error) 
    { res.status(404).json({ message: error.message }); } 
});

// Supprimer une catégorie 
router.delete('/:id', async (req, res)=> {
     try {
        await Categorie.findByIdAndDelete(req.params.id); 
     res.status(200).json({ message: "categorie deleted successfully." });
     } catch (error) {
        res.status(404).json({message:error.message})
     }
      });
module.exports=router;