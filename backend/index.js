const express = require("express")
const mongoose = require("mongoose")
const app = express();
const PORT = 3000;
const DB_URL = "mongodb://localhost:27017/mobile_selling";
require("dotenv").config()

app.use(express.urlencoded({extended:true}))
app.use(express.json())

const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes") 
app.use("/api/user", userRoutes)        // Register, Login
app.use("/api/products", productRoutes) // Product CRUD
app.get("/", (req, res) => {
  res.json({ message: "Mobile Selling API chal raha hai" })
})

mongoose.connect(DB_URL)
    .then(()=>{
        console.log("mongoose connected");
        app.listen(PORT,()=>{
            console.log(`server starts on port => ${PORT}`)
        })
    }).catch(err => console.error("server error",err))
    