const mongoose = require('mongoose');

const {profesores} = require ("../../helpers/constantes/constantes")

const {cursos} = require ("../../helpers/constantes/constantes")

const profSchema = new mongoose.Schema(
    
    {
        name: { type: String, enum : profesores, required: true},
        cursos: [{ type: String, enum : cursos, required: false}],

    },
    // Timestamps: fecha de creación - modificación
    {
        timestamps: true
    }
);


const Profesor = mongoose.model('profesores', profSchema);

// Exportar ES5

module.exports = Profesor;