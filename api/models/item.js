const Sequelize = require('sequelize');

const sequelize = require('../util/databaseseq'); //same name with exported ones

const Item = sequelize.define('item', {
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = Item;