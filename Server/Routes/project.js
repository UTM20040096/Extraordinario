const express = require("express");
const { model, default: mongoose } = require("mongoose");
const projectModel = require("../models/project.model");
const router = express.Router();
const parseId = (id)=>{
    return mongoose.Types.ObjectId(id)
}


//METODO POST CON BODY PARSER
router.post('/', (req, response) => {

    //Le decimos a MONGO QUE VAMOS A GUARDAR LOS DATOS.
    const prject = new projectModel(req.body);
    prject.save()
    .then((projectRegistrado) => {
       return response.status(200).json({
            msg:"Se ha registrado correctamente",
            status: 200,
            cont: {
                project: projectRegistrado
            }
        });
        
    })
    .catch((err) => {
        return response.status(400).json({
            msg:"Error al registrar el usuario",
            status: 400,
            cont: {
                error: err
            }
        });
    });

});
//Parametros Especificos
router.get("/:id", (req, res) => {
 let id = req.params.id
 projectModel.findById(id, (err, projectModel)=>{
    if (err) return res.status(500).send({message:'Error la realizar la peticion: $'})
    if (!projectModel) return res.status(404).send({message: 'El project no existe'})

    res.status(200).send({projectModel})
}) 
});

//Parametros Opcionales
router.get("/", (request, response) => {
   
   
     const registro =  projectModel.find().exec()
    .then((registro) => {
        return response.status(200).json({
            msg:"Se consulto la tabla usuario exitosamente",
            status: 200, 
            cont: {
                 registro
               
            }
        });

    })
    .catch((err) => {
            return response.status(500).json({
                msg:"Error al consultar los datos de el o los project.",
                status: 500,
                cont: {
                    error: err
                }
            });
    });

});

//El metodo put funcion correctamente pero no muestra la actualizasion al instante
//Por lo que debe volver a usar el metodo GET para ver los resultados de la edicion
router.put('/:id', (req, res) => {
    let id = req.params.id
    let update = req.body
    projectModel.findByIdAndUpdate(id,update,(err, projectUpdated)=>{
        if (err) res.status(500).send({message:'Error la Actualizar el project: $'})
        res.status(200).send({projectModel: projectUpdated})
    }) 
});


router.delete('/:id', (req, res) => {
    let id = req.params.id
    projectModel.findByIdAndDelete(id, (err, Usuariomodel)=>{
        if (err) return res.status(500).send({message:'Error la realizar la peticion: $'})
        if (!Usuariomodel) return res.status(404).send({message: 'El project no existe'})
    
        res.status(200).send({message : "Se elimino Correctamente"})
    }) 
});




module.exports = router;