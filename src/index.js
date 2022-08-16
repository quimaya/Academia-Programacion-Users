// Librerías

const express = require('express');
const cors = require('cors');


// Routes
const UserRoutes = require('./api/usuarios/user.routes');
const ProfRoutes = require('./api/profesores/prof.routes');
const CursoRoutes = require('./api/cursos/curso.routes');


// DB

const { connectDb } = require('./helpers/database/db');

const {setUpCloudinary} = require("./helpers/utils/cloudinary")

setUpCloudinary ();

// Connect DataBase

connectDb();

// Port
const PORT = process.env.PORT || 8000;
const JWT_SECRET = process.env.JWT_SECRET

// inicilizate express
const app = express();


// Headers & Verbs
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Cors enable

app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));
// Json Data
app.use(express.json({ limit: '1mb' }))
// urlEncoded
app.use(express.urlencoded({ limit: '1mb', extended: true }));

//Secret KEY
app.set("secretKey", JWT_SECRET)

// Routes
app.use('/api/usuarios', UserRoutes);
app.use('/api/profesores', ProfRoutes);
app.use('/api/cursos', CursoRoutes);



// Routes not found 404

app.use('*', (req, res, next) => {
    const error = new Error()
    error.status = 404
    error.message = 'Route not found'
    return next(error)
})

// Error handler

app.use((error, req, res, next) => {
    return res.status(error.status || 500).json(error.message || 'Unexpected error');
})

// Enable Language

app.disable('x-powered-by')

// Open Listener Server

app.listen(PORT, () => {
    console.log('Server is running in http://localhost:' + PORT)
});