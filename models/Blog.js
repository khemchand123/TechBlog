const {Sequelize, DataTypes} = require('sequelize')
const db = require('../database/db')

const Blog = db.define('Blog', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    category: {
        type: Sequelize.STRING
    },
    title: {
        type: Sequelize.STRING
    },
    description: { 
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.STRING
    },
}, {
    timestamps: true,
    //freezeTableName: true,
});


module.exports = Blog;

