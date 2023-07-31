const catchError = require("../utils/catchError");
const Movies = require("../Models/Movies");
const Directors = require("../Models/Directors");
const Genres = require("../Models/Genres");
const Actors = require("../Models/Actors");

const getAll = catchError(async (req, res) => {
  const results = await Movies.findAll({ include: [{ model: Directors }, { model: Genres }, { model: Actors }] });
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const result = await Movies.create(req.body);
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Movies.findByPk(id, { include: [ { model: Genres }, { model: Directors }, { model: Actors }] });
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await Movies.destroy({ where: { id } });
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Movies.update(req.body, {
    where: { id },
    returning: true,
  });
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

const setMoviesGenres = catchError(async (req, res) => {
  const { id } = req.params;
  const movie = await Movies.findByPk(id);
  
  if(!movie) return res.status(404).json({ message: "Not movies found" });
  await movie.setGenres(req.body);
  const genres = await movie.getGenres();
  return res.json(genres);
});

const setMoviesDirectors = catchError(async (req, res) => {
  const { id } = req.params;
  const movie = await Movies.findByPk(id);
  
  if(!movie) return res.status(404).json({ message: "Not movies found" });
  await movie.setDirectors(req.body);
  const directors = await movie.getDirectors();
  return res.json(directors);
});

const setMoviesActors = catchError(async (req, res) => {
  const { id } = req.params;
  const movie = await Movies.findByPk(id);
  
  if(!movie) return res.status(404).json({ message: "Not movies found" });
  await movie.setActors(req.body);
  const actors = await movie.getActors();
  return res.json(actors);
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  setMoviesGenres,
  setMoviesActors,
  setMoviesDirectors
};
