const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routeGenres=require("../routes/routeGenres")
const routeJuego=require("../routes/routeJuego")

const router = Router();

router.use("/juegos",routeJuego)
router.use("/generos",routeGenres)
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



module.exports = router;
