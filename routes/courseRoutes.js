const express = require('express')
const CoursesModel = require('../models/courseModel')
const { default: mongoose } = require('mongoose')
const router = express.Router()

//Definir las rutas para con el ruteador
//Esta ruta va a traer todos los 
router.get('/', async (req , res) => {
    //Seleccionar todos los  en la colección
    try{
        const courses = 
            await CoursesModel.find()
        if(courses.length === 0) {
            res.
                status(400).
                json({
                    success: false,
                    msg: "No hay cursos en la collection"
            }) 
        }else{
            res.
                status(200).
                json({
                    success: true,
                    data: courses
                })
        }
    } catch (error) {
        res.status(500).json({
            succes: false,
            msg: error.message
        })
    }})

//Seleccionar  por ID
router.get('/:id' , async (req, res) => {

    try{
        //Recoger el parametro ID de la url
        courseid = req.params.id
        //Validar el id suministrado
        if(!mongoose.Types.ObjectId.isValid(courseid)){
            res.status(400).json({
                succes: false,
                msg: "El id no es valido"
            })
        }else{
            //Seleccionar el  por id
            selected_course =  await CoursesModel.findById(courseid)
        
            if(selected_course){
            //Se encontro el 
            //Enviar respuesta
                res.status(200).json({
                    succes: true,
                    results: selected_course
            })
        }else{
        //No se encontró el 
        //Enviar respuesta
            res.status(400).json({
                succes: false,
                msg: `No se encontro el curso ${courseid}`
            })
        }
    }
     
    }catch (error){
        res.status(500).json(
            {
                succes: false,
                msg: error.message
            })
    }
})

//Para que funcione en thunder client, en el sector de header hay que poner content-type y poner value json
//Crear cursos
router.post('/', async(req , res) => {

    try {
        const newCourse = await CoursesModel.create(req.body)
        res.status(201).json({
            succes: true,
            results: newCourse
        })
    } catch (error) {
        res.status(500).json({
            succes: false,
            msg: error.message
        })
    }
})

router.put('/:id', async(req, res)=>{
    try{
        //Recoger el parametro ID de la url
        courseid = req.params.id
        //Validar el id suministrado
        if(!mongoose.Types.ObjectId.isValid(courseid)){
            res.status(400).json({
                succes: false,
                msg: "El id no es valido"
            })
        }else{
            //Seleccionar el bootcamp por id
            selected_course =  await CoursesModel.findByIdAndUpdate(courseid,
                req.body,
                {
                    new:true
                })
        
            if(selected_course){
            //Se encontro el bootcamp
            //Enviar respuesta
                res.status(200).json({
                    succes: true,
                    results: selected_course
            })
        }else{
        //No se encontró el bootcamp
        //Enviar respuesta
            res.status(400).json({
                succes: false,
                msg: `No se encontro el curso ${courseid}`
            })
        }
    }
     
    }catch (error){
        res.status(500).json(
            {
                succes: false,
                msg: error.message
            })
    }
} )

router.delete('/:id', async(req, res)=>{
    try{
        //Recoger el parametro ID de la url
        courseid = req.params.id
        //Validar el id suministrado
        if(!mongoose.Types.ObjectId.isValid(courseid)){
            res.status(400).json({
                succes: false,
                msg: "El id no es valido"
            })
        }else{
            //Seleccionar el bootcamp por id
            selected_course =  await CoursesModel.findByIdAndDelete(courseid,
                req.body,
                {
                    new:true
                })
        
            if(selected_course){
            //Se encontro el bootcamp
            //Enviar respuesta
                res.status(200).json({
                    succes: true,
                    results: selected_course
            })
        }else{
        //No se encontró el bootcamp
        //Enviar respuesta
            res.status(400).json({
                succes: false,
                msg: `No se encontro el curso ${courseid}`
            })
        }
    }
     
    }catch (error){
        res.status(500).json(
            {
                succes: false,
                msg: error.message
            })
    }
} )
//Exportar ruteador
module.exports = router