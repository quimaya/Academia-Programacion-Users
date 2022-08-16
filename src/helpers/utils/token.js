//Este es el fichero de gestión de Tokens
//Aquí creamos Tokens y los verificamos

//Esto es para gestionar las contraseñas, dándole más seguridad

const jwt = require("jsonwebtoken");

//Generamos la firma para nuestro token con los campos que queramos y hacemos que expire en un día.
//Sólo vamos a poder trabajar durante un día sin tener que cerrar sesión

const createToken = (id, username) => { //Le pasamos el ID que son campos requeridos
  return jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: "1d" }); //Lo de Secret es para saber que yo soy el dueño de este servidor, que nadie lo vaya a rescatar
}

//Verificamos que el token es válido, que no ha expirado y que se corresponde con nuestra clave secreta que hemos generado en .env

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { createToken, verifyToken }
