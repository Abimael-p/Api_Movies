const Movies = require("./Movies");
const Directors = require("../Models/Directors");
const Genres = require("./Genres");
const Actors = require("./Actors");


Movies.belongsToMany(Genres, { through: 'GenresMovies' });
Genres.belongsToMany(Movies, { through: 'GenresMovies' });

Movies.belongsToMany(Directors, { through: 'MoviesDirectors' });
Directors.belongsToMany(Movies, { through: 'MoviesDirectors' });

Movies.belongsToMany(Actors, { through: 'MoviesActors' });
Actors.belongsToMany(Movies, { through: 'MoviesActors' });