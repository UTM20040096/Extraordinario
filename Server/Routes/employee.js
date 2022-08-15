const express = require("express");
const { model, default: mongoose } = require("mongoose");
const employeeModel = require("../models/employee.model");
const router = express.Router();
const parseId = (id)=>{
    return mongoose.Types.ObjectId(id)
}


//METODO POST CON BODY PARSER
router.post('/', (req, response) => {

    //Le decimos a MONGO QUE VAMOS A GUARDAR LOS DATOS.
    const employee = new employeeModel(req.body);
    employee.save()
    .then((employeeRegistrado) => {
       return response.status(200).json({
            msg:"Se ha registrado correctamente",
            status: 200,
            cont: {
                employee: employeeRegistrado
            }
        });
        
    })
    .catch((err) => {
        return response.status(400).json({
            msg:"Error al registrar el employee",
            status: 400,
            cont: {
                error: err
            }
        });
    });

});


//Parametros Opcionales
router.get("/", (request, response) => {
   
   
     const registro =  employeeModel.find().exec()
    .then((registro) => {
        return response.status(200).json({
            msg:"Se consulto la tabla employee exitosamente",
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
    employeeModel.findByIdAndUpdate(id,update,(err, employeeUpdated)=>{
        if (err) res.status(500).send({message:'Error la Actualizar el employee: $'})
        res.status(200).send({employeeModel: employeeUpdated});
    }) 
});


router.delete('/:id', (req, res) => {
    let id = req.params.id
    employeeModel.findByIdAndDelete(id, (err, employeeModel)=>{
        if (err) return res.status(500).send({message:'Error la realizar la peticion: $'})
        if (!employeeModel) return res.status(404).send({message: 'El employee no existe'})
    
        res.status(200).send({message : "Se elimino Correctamente"})
    }) 
});

router.get("/:id", (req, res) => {
    let id = req.params.id
    employeeModel.findById(id, (err, employeeModel)=>{
       if (err) return res.status(500).send({message:'Error la realizar la peticion: $'})
       if (!employeeModel) return res.status(404).send({message: 'El employee no existe'})
   
       res.status(200).send({employeeModel})
   }) 
   });


   router.post("/login",(request,response) => {

    const usuario = request.body.strName;
    const projecto = request.body.idProject;

    employeeModel.findOne({"usuario":usuario,"projecto":projecto})
    .then ((employeelogeado) =>{ 
        if(employeelogeado == null){
            return response.status(500).json({
                message : "Autenticacion Fallida",

            });

        }else{
            
                return response.status(200).json({
                    message : "Autenticacion Exitosa",
                  
                 });
        }
    })


   
    });

module.exports = router;