const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGO_URI;

    // Automatically use an in-memory database if the URI is a placeholder or not provided
    if (!mongoUri || mongoUri.includes('YOUR_CLUSTER') || mongoUri.includes('cluster0.xxxxx')) {
      console.warn('⚠️ Placeholder MongoDB URI detected. Spinning up an in-memory database automatically...');
      const mongoServer = await MongoMemoryServer.create();
      mongoUri = mongoServer.getUri();
    }

    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  }
};

module.exports = connectDB;
