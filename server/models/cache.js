const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/cache';
const TTL = process.env.TTL || 1000 * 60 * 60 * 24 * 3;

function timeToLive() { return Date.now() + TTL; }

mongoose.connect(MONGO_URL);

const Schema = new mongoose.Schema({
  ttl: { type: Date, default: timeToLive },
}, {
  capped: { max: process.env.CAP || 10 },
});

Schema.pre('save', (next) => {
  this.ttl = timeToLive();
  return next();
});


const Cache = mongoose.model('Cache', Schema);

function expried() {
  const time = Date.now() - TTL;
  return new Date(time).toJSON();
}

setInterval(() => Cache.remove({ ttl: { $lte: expried() } }), TTL);

module.exports = Cache;
