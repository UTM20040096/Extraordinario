const express = require("express");
const { model, default: mongoose } = require("mongoose");
const departamentModel = require("../models/departament.model");
const router = express.Router();
const parseId = (id)=>{
    return mongoose.Types.ObjectId(id)
}
//METODO POST CON BODY PARSER
router.post('/', (req, response) => {

    //Le decimos a MONGO QUE VAMOS A GUARDAR LOS DATOS.
    const deprtament = new departamentModel(req.body);
    deprtament.save()
    .then((DeprtamentRegistred) => {
       return response.status(200).json({
            msg:"Se ha registrado correctamente",
            status: 200,
            cont: {
                deprtament: DeprtamentRegistred
            }
        });
        
    })
    .catch((err) => {
        return response.status(400).json({
            msg:"Error al registrar el departament",
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
 departamentModel.findById(id, (err, departamentModel)=>{
    if (err) return res.status(500).send({message:'Error la realizar la peticion: $'})
    if (!departamentModel) return res.status(404).send({message: 'El departament no existe'})

    res.status(200).send({departamentModel})
}) 
});

//Parametros Opcionales
router.get("/", (request, response) => {
   
   
     const registro =  departamentModel.find().exec()
    .then((registro) => {
        return response.status(200).json({
            msg:"Se consulto la tabla dept exitosamente",
            status: 200, 
            cont: {
                 registro
               
            }
        });

    })
    .catch((err) => {
            return response.status(500).json({
                msg:"Error al consultar los datos de los usuarios.",
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
    departamentModel.findByIdAndUpdate(id,update,(err, deprtamentupdated)=>{
        if (err) res.status(500).send({message:'Error la Actualizar el usuario: $'})
        res.status(200).send({departamentModel: deprtamentupdated})
    }) 
});


router.delete('/:id', (req, res) => {
    let id = req.params.id
    departamentModel.findByIdAndDelete(id, (err, departamentModel)=>{
        if (err) return res.status(500).send({message:'Error la realizar la peticion: $'})
        if (!departamentModel) return res.status(404).send({message: 'El dept no existe'})
    
        res.status(200).send({message : "Se elimino Correctamente"})
    }) 
});




module.exports = router;