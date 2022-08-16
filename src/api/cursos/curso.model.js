const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {precios} = require('../../helpers/constantes/constantes')
const {cursos} = require('../../helpers/constantes/constantes')


// Necesitare cosas para - registro


const schema = new Schema({
    name: { type: String, enum:cursos, unique: true, required: true },
    horas: { type: Number, required: true, unique:true },
    precio: { type: Number, enum: precios, required: true },
    profeso: [{ type: mongoose.Schema.Types.ObjectId, ref: "profesores", required: false }],

    
},
    {
        timestamps: true
    }
);



const Curso = mongoose.model('cursos', schema);

module.exports = Curso;