//Variables de entorno

//Configuiracion del puerto
process.env.PORT = process.env.PORT || 3000;

//Entorno 
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

//Configiracion de la base de datos
if (process.env.NODE_ENV === "dev"){
    //BASE DE DATOS PROYECTO FINAL mongodb+srv://admin:s1v8c9wfcZr0PAgB@cluster0.slgur.mongodb.net/utm20040062-Proyectofinal?retryWrites =true&w=majority
    process.env.URLDB = "mongodb+srv://user5a:GF8TaI1UH6ZsyUWr@cluster0.slgur.mongodb.net/utm20040096-extraordinario?retryWrites=true&w=majority";
}else{
    process.env.URLDB= "mongodb+srv://user5a:GF8TaI1UH6ZsyUWr@cluster0.slgur.mongodb.net/utm20040096-extraordinadrio?retryWrites=true&w=majority";
}

