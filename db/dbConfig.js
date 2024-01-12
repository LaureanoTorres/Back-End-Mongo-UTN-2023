const mongoose = require('mongoose')
const MODE = require('./config')

const DB_NAME = process.env.DB_NAME

const mongoDB_URL = (MODE == 'PROD' ? process.env.DB_URI_PROD : process.env.DB_URI) + DB_NAME

/* const mongoDB_URI = process.env.DB_URL + DB_NAME */


mongoose.connect(mongoDB_URL,{})

const db = mongoose.connection

db.on('error',()=>{
    console.log('hola')
})

db.once('open', () =>{
    console.log('Conexion exitosa con MongoDB')
})




module.exports = mongoose