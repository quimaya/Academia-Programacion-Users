// Es el enrutamiento | EndPoints que nos da express
const ProfRoutes = require('express').Router();

// Importación en ES5 - Métodos de controller
const {
    recuperar,
    getById,
    crear,
    update,
    remove,
    updateByName,
    recuperarNombre
} = require('./prof.controller');

ProfRoutes.get('/', recuperar);
ProfRoutes.get('/:id', getById);
ProfRoutes.get('/:id', recuperarNombre);
ProfRoutes.post('/', crear);
ProfRoutes.patch('/:id', update);
ProfRoutes.patch('/:name', updateByName);
ProfRoutes.delete('/:id', remove);

module.exports = ProfRoutes;