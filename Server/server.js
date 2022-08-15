const express= require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require ("bcrypt");
require("colors");
require("./config/config");
const routes = require("./Routes/index");
const app = express();
const employee = require("./Routes/employee");
const departament = require("./Routes/departament");
const Project = require("./Routes/project");
const {response} = require ("express");
const { request } = require("./Routes/index");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use("/api",routes);
app.get("/",(request, response)=>{
    return response.status(200).json({
        msg:"Estas dentro de la Api Get de Cueto",
        status : 200
    })
});

mongoose.connect(process.env.URLDB,{})
.then(() => {
    console.log("[MONGODB]".green+"DATABASE CONNECTION SUCCESSFULLY");   
    
 })
 .catch((err) => {
    console.log("[MONDODB]".red + "Coneccion fail");
});
app.listen(process.env.PORT, () => {
 console.log("Listen in the PORT: "+ process.env.PORT.green);
});