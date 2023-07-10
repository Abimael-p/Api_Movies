const { DataTypes } = require('sequelize');
const { v4: uuid4v } = require('uuid')
const sequelize = require('../utils/connection');

const Movies = sequelize.define('movies', {
    id: {
        type: DataTypes.STRING(10),
        primaryKey: true,
        defaultValue: () => uuid4v().slice(0, 10)
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    synopsis: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    releaseyear: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    //Director_id
    //Genres_id
    //Actors_id
});

module.exports = Movies;