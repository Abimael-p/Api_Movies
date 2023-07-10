const { DataTypes } = require('sequelize');
const { v4: uuid4v } = require('uuid')
const sequelize = require('../utils/connection');

const Directors = sequelize.define('directors', {
    id: {
        type: DataTypes.STRING(10),
        primaryKey: true,
        defaultValue: () => uuid4v().slice(0, 10)
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nationality: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: false
    },
    //Movies_id
});

module.exports = Directors;