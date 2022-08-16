//Importar con ES5
//Requerimos la librería

const mongoose = require('mongoose');

//Requerimos la librería

require('dotenv').config()

const urlDb = process.env.MONGO_URI

const connectDb = async () => { //Conexión asincrona. No se conecta inmediatamente
    try {
        // Método de Mongoose 
        // 1- Param URI [donde quiero que te conectes]
        // 2- Param {configuración} -> Parsear los datos de url
        const db = await mongoose.connect(urlDb, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        const { name, host } = db.connection
        console.log(`Connected with db 💾 name: ${name} in host: ${host}`)
    } catch (error) {
        console.error('Error to connect with db 💾', error);
    }
}

module.exports = {
    connectDb
}