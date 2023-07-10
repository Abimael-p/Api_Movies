const { getAll, create, getOne, remove, update, setMoviesGenres, setMoviesActors, setMoviesDirectors } = require('../controllers/Movies.controllers');
const express = require('express');

const moviesRouter = express.Router();

moviesRouter.route('/')
    .get(getAll)
    .post(create);
    
moviesRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);
    
moviesRouter.route('/:id/genres')
    .put(setMoviesGenres)

moviesRouter.route('/:id/actors')
    .put(setMoviesActors)

moviesRouter.route('/:id/directors')
    .put(setMoviesDirectors)


module.exports = moviesRouter;