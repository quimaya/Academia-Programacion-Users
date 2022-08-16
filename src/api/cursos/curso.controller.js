const Curso = require('./curso.model');
const { setError } = require('../../helpers/utils/error');

const getAll = async (req, res, next) => {
    try {
        const cursos = await Curso.find().populate("profesores");
        return res.json({
            status: 200,
            message: 'Cursos recuperados',
            data: { cursos: cursos  }
        });
    } catch (error) {
        return next(setError(500, 'Failed all codes'));
    }
}

const getById = async (req, res, next) => {
    try {
        const { id } = req.params
        const curso = await Curso.findById(id);
        if (!curso) return next(setError(404, 'Curso no encontrado'))
        return res.json({
            status: 200,
            message: 'Curso recuperado',
            data: { curso:curso }
        });
    } catch (error) {
        return next(setError(500, 'Failed element'))
    }
}

const create = async (req, res, next) => {
    try {
        const curso = new Curso(req.body)
        const cursoInBd = await curso.save()
        return res.json({
            status: 201,
            message: 'Nuevo curso creado',
            data: { curso: cursoInBd }
        });
    } catch (error) {
        return next(setError(500, 'Fallo creando curso'))
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const curso = new Curso(req.body);
        curso._id = id;
        const updatedCurso = await Curso.findByIdAndUpdate(id, curso)
        if (!updatedCurso) return next(setError(404, 'Code not found'))
        return res.json({
            status: 201,
            message: 'Curso actualizado',
            data: { curso: updatedCurso }
        });
    } catch (error) {
        return next(setError(500, 'Fallo actualizando curso'));
    }
}

const deleteElement = async (req, res, next) => {
    try {
        const { id } = req.params
        const deletedElement = await Curso.findByIdAndDelete(id)
        if (!deletedElement) return next(setError(404, 'Curso no encontrado'))
        return res.json({
            status: 200,
            message: 'curso borrado',
            data: { element: deletedElement }
        });
    } catch (error) {
        return next(setError(500, 'Fallo borrando curso'));
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteElement
}