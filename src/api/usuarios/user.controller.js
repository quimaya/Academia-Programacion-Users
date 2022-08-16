const User = require("./user.model");
const bcrypt = require("bcrypt");
const { createToken } = require("../../helpers/utils/token");
const { setError } = require("../../helpers/utils/error");



const recuperarUsuarios = async (req, res, next) => {
    try {
        const usuarios = await User.find();
        return res.json({
            status: 200,
            message: 'Usuarios recuperados',
            data: { usuarios }
        });
    } catch (error) {
        return next(setError(500, 'Failed all codes'));
    }
}


const userByUsername = async (req, res, next) => {
  try {
    const { username } = req.params;
    if (username != req.user.username) return next(setError(403, "Nombre de Usuario no encontrado"));
    const user = await User.find({username:username});
    if (!user) return next(setError(404, "Usuario no encontrado"));
    return res.json({
        status:200,
        message: 'Usuario encontrado',
        data: {username}
  }) 
} catch (error) {
    return next(setError(500, error.message || 'Failed recover User'));
  }
}


const register = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const emailExist = await User.findOne({ email: newUser.email }); //Estoy viendo si el email existe
    const usernameExist = await User.findOne({ username: newUser.username }); //Vemos si el usuario existe
    if (emailExist || usernameExist) return next(setError(409, "This Email || Username already exist")); //Si el user o el e-mail existe le digo que me de error

    const newUserInDb = await newUser.save();
    res.status(201).json(newUserInDb);

  } catch (error) {
    return next(setError(500, error.message || 'Fallo creando usuario'));
  }
}

const login = async (req, res, next) => {
  try {
    const userInDb = await User.findOne({ username: req.body.username }); //Comprueba si existe el username en la database
    if (!userInDb) return next(setError(404, "Usuario no Encontrado"));

    if (bcrypt.compareSync(req.body.password, userInDb.password)) { //Si la contraseña que me estás mandando es igual a la del userinfo, me creas el token
      //Seteamos la contraseña a null por seguridad para que no se vea en ninguna respuesta
        const token = createToken(userInDb._id, userInDb.username); //Creamos el token con los ingredientes que queramos
      return res.status(200).json({ userInDb, token })
    } else {
      return next(setError(401, "Password inválida"));
    }
  } catch (error) {
    return next(setError(500, error.message || 'Error en login'));
  }
}


const updateByUsername = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = new User(req.body);
    user._username = username;
    const updatedUser = await User.findOneAndUpdate(username, user);
    if (!updatedUser) return next(setError(404, 'Username no encontrado'));
    return res.status(201).json({
        status: 200,
      message: 'Usuario actualizado',
      data: updatedUser
    })

  } catch (error) {
    return next(setError(500, error.message | 'Failed updated user'));
  }
}


const remove = async (req, res, next) => {
  try {
    const { id } = req.params.id;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return next(setError(404, 'User not found'));
    return res.status(200).json({
      message: 'Delete User',
      deletedUser
    })
  } catch (error) {
    return next(setError(500, error.message | 'Failed deleted user'));
  }
}

module.exports = { register, login, userByUsername, updateByUsername, recuperarUsuarios, remove };