const mongoose= require("mongoose");
const parseId= (id) => {return mongoose.Types.ObjectId(id)}

const DepartamentSchema = mongoose.Schema({
    strDeptNombre : {
        type: String,
        required: [true,"Es necesario ingresar el Nombre"]
 
        }
    

})


module.exports = mongoose.model("departament", DepartamentSchema);