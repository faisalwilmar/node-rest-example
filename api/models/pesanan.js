const Sequelize = require('sequelize');

const sequelize = require('../util/databaseseq'); //same name with exported ones

const Pesanan = sequelize.define('pesanan', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    payment: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Pesanan;