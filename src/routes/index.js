const express = require("express");
const router = express.Router();
const moviesRouter = require("./Movies.router.js");
const actorsRouter = require("./Actors.router.js");
const directorsRouter = require("./Directors.router.js");
const genresRouter = require("./Genres.router.js");
require("../Models")

// colocar las rutas aquí
router.use("/movies", moviesRouter);

router.use("/actors", actorsRouter);

router.use("/directors", directorsRouter);

router.use("/genres", genresRouter);

module.exports = router;
