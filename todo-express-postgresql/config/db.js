const Sequelize = require('sequelize');
const config = require('config');

const db = config.get('postgresURL');

const sequelize = new Sequelize(db);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { connectDB, db };
