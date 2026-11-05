const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

const closeDB = async () => {
  try {
		await mongoose.connection.close();
    console.log('MongoDB Disconnected...');
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { connectDB, closeDB };
