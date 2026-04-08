const express = require("express")
const Route = express.Router();
const userControllers  = require("../controllers/userController")


Route.post("/register",userControllers.registerUser)
Route.post("/login",userControllers.loginUser)


module.exports = Route;