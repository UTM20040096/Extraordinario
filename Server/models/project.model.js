const mongoose= require("mongoose");
const parseId= (id) => {return mongoose.Types.ObjectId(id)}

const projectSchema = mongoose.Schema({
    strProjectName : {
        type: String,
        required: [true,"Es necesario ingresar el Nombre"]
    }
})

module.exports = mongoose.model("project", projectSchema);