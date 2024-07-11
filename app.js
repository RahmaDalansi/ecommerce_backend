//importing express and dotenv and mongoose
const express= require("express")
const mongoose =require("mongoose")
const dotenv= require("dotenv")
const cors= require("cors")
const categorieRouter= require("./routes/categorie.route")
const scategorieRouter= require("./routes/scategorie.route")
const articleRouter= require("./routes/article.route")

//instance de la classe express
const app=express()

app.use(cors({
    origin:'*'
}))

//middleware it's to understand req.body in categorie.route.js
app.use (express.json())

dotenv.config()

app.get ("/",(req,res)=>{
    res.send("bienvenu dans notre site")
})

// Connexion à la base données
mongoose.connect(process.env.DATABASECLOUD)
.then(() => {console.log("DataBase Successfully Connected");})
.catch(err => { console.log("Unable to connect to database", err);
process.exit(); });

app.use("/api/categories", categorieRouter)
app.use("/api/scategories", scategorieRouter)
app.use("/api/articles", articleRouter)


//port
app.listen(process.env.PORT)
console.log("application run at port" + process.env.PORT)
/*console.log(`Server is listening on port ${process.env.PORT}`)*/

module.exports=app;