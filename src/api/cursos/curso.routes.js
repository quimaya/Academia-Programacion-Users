const CursoRoutes = require('express').Router();
const {
    getAll,
    getById,
    create,
    update,
    deleteElement } = require('./curso.controller');

CursoRoutes.get('/', getAll)
CursoRoutes.get('/:id', getById)
CursoRoutes.post('/', create)
CursoRoutes.patch('/:id', update)
CursoRoutes.delete('/:id', deleteElement)

module.exports = CursoRoutes