const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid')
const sequelize = require('../utils/connection');

const Genres = sequelize.define('genres', {
    id: {
        type: DataTypes.STRING(10),
        primaryKey: true,
        defaultValue:() => uuidv4().slice(0, 10)
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },      
});

module.exports = Genres;