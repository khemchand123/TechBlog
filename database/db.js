const Sequelize = require('sequelize')

//admin4 Social_Network
//dbeaver Admin
const db = new Sequelize('Admin', 'postgres', 'kcr', {
    host: 'localhost',
    dialect: 'postgres'
  });

const testDB = async()=>{
    try {
        await db.authenticate();
        console.log('DataBase Connection has been established successfully...');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testDB();

module.exports = db;