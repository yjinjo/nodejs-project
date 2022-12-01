const mongodb = require('mongodb');
require('dotenv').config();

const MongoClient = mongodb.MongoClient;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

const mongoConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://yjinjo:${MONGO_PASSWORD}@cluster0.olplonm.mongodb.net/?retryWrites=true&w=majority`
  )
    .then((client) => {
      console.log('Connected!');
      callback(client);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = mongoConnect;
