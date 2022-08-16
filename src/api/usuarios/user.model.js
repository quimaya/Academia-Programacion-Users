//Nos traemos mongoose para generar el Schema
const mongoose = require('mongoose');

// Librería para encriptar la contraseña
const bcrypt = require("bcrypt");
const { validationPassword, validationEmail } = require("../../helpers/utils/utils");

const {cursos} = require ("../../helpers/constantes/constantes")


const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    name: {type: String, required: true},
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true },
    cursos: [{ type: String, enum: cursos, required: false }]

},
    {
        timestamps: true
    }
);

//Guardamos la contraseña encriptada. Usamos el método mongoose presave

userSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
    if (!validationPassword(this.password)) {
    return next(new Error())
    ;
  }
  //validamos email y password  
        if (!validationEmail(this.email)) {
    return next(new Error());
    }
    //Encriptamos la contraseña. El 10 es que generamos 10 contraseñas aleatorias y a la décima es la definitiva
    
})

const User = mongoose.model('users', userSchema);
module.exports = User