const Profesor = require('./prof.model');
const { setError } = require('../../helpers/utils/error');

const recuperar = async (req, res, next) => {
    try {
        const profesores = await Profesor.find();
        return res.json({
            status: 200,
            message: 'Profesores recuperados',
            data: { profesores }
        });
    } catch (error) {
        return next(setError(500, 'Failed all codes'));
    }
}

const getById = async (req, res, next) => {
    try {
        const { id } = req.params
        const profesor = await Profesor.findById(id);
        if (!profesor) return next(setError(404, 'Profesor no encontrado'))
        return res.json({
            status: 200,
            message: 'Profesor recuperado',
            data: { profesor:profesor }
        });
    } catch (error) {
        return next(setError(500, 'Failed element'))
    }
}

const recuperarNombre = async (req, res, next) => {
    try {
        const { name } = req.params;
        const profesor = await Profesor.find({name:name});
        if (!profesor) return next(setError(404, 'Profesor no encontrado'))
        return res.json({
            status: 200,
            message: 'Profesor recuperado por nombre',
            data: { profesor }
        });
    } catch (error) {
        return next(setError(500, 'Failed element'))
    }
}

const crear = async (req, res, next) => {
    try {
        const profesor = new Profesor(req.body);
        const profesorInBd = await profesor.save()
        return res.json({
            status: 201,
            message: 'Profesor creado',
            data: { profesorInBd }
        });
    } catch (error) {
        return next(setError(500, 'Fallo creando profesor'))
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const profesor = new Profesor(req.body);
        profesor._id = id;
        const updatedProfesor = await Profesor.findByIdAndUpdate(id, profesor);
        return res.status(200).json(updatedProfesor);

    } catch (error) {
        return next(setError(500, 'Failed updated element'));
    }
}

const updateByName = async (req, res, next) => {
    try {
        const { updateProfesorName } = req.params
        const profesor = new Profesor(req.body);
        element._name = name;
        const updatedProfesor = await Profesor.findOneAndUpdate(profesor)
        if (!updatedProfesor) return next(setError(404, 'Code not found'))
        return res.json({
            status: 201,
            message: 'Updated element',
            data: { updateProfesorName }
        });
    } catch (error) {
        return next(setError(500, 'Failed updated element'));
    }
}

const remove = async (req, res, next) => {
    try {
        const { id } = req.params
        const deletedElement = await Element.findByIdAndDelete(id)
        if (!deletedElement) return next(setError(404, 'Element not found'))
        return res.json({
            status: 200,
            message: 'deleted element',
            data: { element: deletedElement }
        });
    } catch (error) {
        return next(setError(500, 'Failed deleted element'));
    }
}

module.exports = {
    recuperar,
    getById,
    crear,
    update,
    remove,
    updateByName,
    recuperarNombre
}