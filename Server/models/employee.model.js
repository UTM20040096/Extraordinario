const mongoose= require("mongoose");
const bcrypt = require("bcrypt");
const parseId= (id) => {return mongoose.Types.ObjectId(id)}

const employeeSchema = mongoose.Schema({
    strName : {
        type: String,
        required: [true,"Es necesario ingresar el Nombre"]
    },
    strJobTitle :{
        type: String,
        required: [true,"Es necesario ingresar el titulo del trabajo "]
    },
    nmbSalary :Number,

    idDepartament:{
        type: mongoose.Types.ObjectId, 
        required:[true, "descripcion"]
    },
    idProject:{
        type: mongoose.Types.ObjectId, 
        required:[true, "descripcion"]
    },

})

module.exports = mongoose.model("employee", employeeSchema);