const express = require('express')
const BootcampModel = require('../models/bootcampModel')
const { default: mongoose } = require('mongoose')
const bootcampModel = require('../models/bootcampModel')
const router = express.Router()

//Definir las rutas para bootcamps con el ruteador
//Esta ruta va a traer todos los bootcamps
router.get('/', async (req , res) => {
    //Seleccionar todos los bootcamps en la colección
    try{
        const bootcamps = 
            await BootcampModel.find()
        if(bootcamps.length === 0) {
            res.
                status(400).
                json({
                    success: false,
                    msg: "No hay bootcamps en la collection"
            }) 
        }else{
            res.
                status(200).
                json({
                    success: true,
                    data: bootcamps
                })
        }
    } catch (error) {
        res.status(500).json({
            succes: false,
            msg: error.message
        })
    }})

//Seleccionar bootcamp por ID
router.get('/:id' , async (req, res) => {

    try{
        //Recoger el parametro ID de la url
        bootcampid = req.params.id
        //Validar el id suministrado
        if(!mongoose.Types.ObjectId.isValid(bootcampid)){
            res.status(400).json({
                succes: false,
                msg: "El id no es valido"
            })
        }else{
            //Seleccionar el bootcamp por id
            selected_bootcamp =  await BootcampModel.findById(bootcampid)
        
            if(selected_bootcamp){
            //Se encontro el bootcamp
            //Enviar respuesta
                res.status(200).json({
                    succes: true,
                    results: selected_bootcamp
            })
        }else{
        //No se encontró el bootcamp
        //Enviar respuesta
            res.status(400).json({
                succes: false,
                msg: `No se encontro el bootcamp ${bootcampid}`
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
//Crear bootcamp
router.post('/', async(req , res) => {

    try {
        const newBootcamp = await BootcampModel.create(req.body)
        res.status(201).json({
            succes: true,
            results: newBootcamp
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
        bootcampid = req.params.id
        //Validar el id suministrado
        if(!mongoose.Types.ObjectId.isValid(bootcampid)){
            res.status(400).json({
                succes: false,
                msg: "El id no es valido"
            })
        }else{
            //Seleccionar el bootcamp por id
            selected_bootcamp =  await BootcampModel.findByIdAndUpdate(bootcampid,
                req.body,
                {
                    new:true
                })
        
            if(selected_bootcamp){
            //Se encontro el bootcamp
            //Enviar respuesta
                res.status(200).json({
                    succes: true,
                    results: selected_bootcamp
            })
        }else{
        //No se encontró el bootcamp
        //Enviar respuesta
            res.status(400).json({
                succes: false,
                msg: `No se encontro el bootcamp ${bootcampid}`
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
        bootcampid = req.params.id
        //Validar el id suministrado
        if(!mongoose.Types.ObjectId.isValid(bootcampid)){
            res.status(400).json({
                succes: false,
                msg: "El id no es valido"
            })
        }else{
            //Seleccionar el bootcamp por id
            selected_bootcamp =  await BootcampModel.findByIdAndDelete(bootcampid,
                req.body,
                {
                    new:true
                })
        
            if(selected_bootcamp){
            //Se encontro el bootcamp
            //Enviar respuesta
                res.status(200).json({
                    succes: true,
                    results: selected_bootcamp
            })
        }else{
        //No se encontró el bootcamp
        //Enviar respuesta
            res.status(400).json({
                succes: false,
                msg: `No se encontro el bootcamp ${bootcampid}`
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