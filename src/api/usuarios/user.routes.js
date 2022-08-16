const UserRoutes = require("express").Router();
const rateLimit = require("express-rate-limit");
const { authorize } = require("../../middleware/auth");


const { register, login, userByUsername, updateByUsername, recuperarUsuarios, remove } = require("./user.controller");


const userCreateRateLimit = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutos
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

UserRoutes.post('/register', [userCreateRateLimit], register); //Tiempo máximo en realizar la petición de POST. Máximo dos veces. 
UserRoutes.post('/login', login);
UserRoutes.get('/', recuperarUsuarios);
UserRoutes.get('/:username', [authorize], userByUsername);
UserRoutes.patch('/:id', [authorize], updateByUsername);
UserRoutes.delete('/:id', [authorize], remove);

module.exports = UserRoutes;