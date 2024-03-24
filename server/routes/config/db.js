const mongoose = require("mongoose");
const connect = async () => {
  try {
    mongoose.set("strictQuery", false);
    // Connect to the database
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connect;
