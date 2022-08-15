const express = require("express");
const app = express();
const employee = require("./employee");
const project = require("./project");
const departament = require ("./departament");


app.use("/employee",employee); // http://localhost:3000/usuario
app.use("/project",project); // http://localhost:3000/Categorias
app.use("/departament",departament); //http://localhost:3000/Empresa

module.exports = app;