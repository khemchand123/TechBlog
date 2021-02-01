
const { Sequelize, DataTypes } = require('sequelize');
const db = require('../database/db')

const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },

}, {
    timestamps: true,
    //freezeTableName: true,
});


/* for Testing purpose
const jane = User.build({ name: "Jane" });
console.log(jane)
*/

module.exports = User;
