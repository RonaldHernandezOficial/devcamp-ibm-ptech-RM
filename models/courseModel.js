const mongoose = require('mongoose')

//Definir el Schema
//Definir el plano general de todo boocamp
//El number se debe poner en MAYUSCULA Number

const coursesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [ true, "Titulo requerido" ],
        unique : [true, "Titulo repetido"],
        maxlength: [30, "Titulo muy largo"],
        minlength: [10, "Titulo muy corto"]
    },
    description: {
        type: String,
        required: [ true, "Descripción requerida" ],
        minlength: [ 10  , "Descripción muy corta"]
    },
    weeks: {
        type: Number,
        required: [ true, "Semanas requeridas" ],
        Number: ["No es entero"],
        max: [ 9 , "El número maximo de semanas debe ser 9"]
        
    },
    enroll_cost: {
        type: Number,
        required: [ true, "Costo requerido" ],
        Number:[false, "Solo se aceptan caracteres numericos"]
    },
    minimun_skill: {
        type: [ String ],
        required: [ true, "Skills requeridas" ],
        enum: [ "Beginner" , "Intermediate" , "Advanced" , "Expert" ]
    }
})

//Exportar el modelo
const CoursesModel = mongoose
                .model("courses" , 
                coursesSchema)

module.exports = CoursesModel