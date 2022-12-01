const mongodb = require('mongodb');
require('dotenv').config();

const MongoClient = mongodb.MongoClient;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://yjinjo:${MONGO_PASSWORD}@cluster0.olplonm.mongodb.net/shop?retryWrites=true&w=majority`
  )
    .then((client) => {
      console.log('Connected!');
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
