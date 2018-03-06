const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27109/cache';
const TTL = process.env.TTL || 1000 * 60 * 60 * 24 * 3;

function timeToLive() { return Date.now() + TTL; }

mongoose.connect(MONGO_URL);

const Cache = mongoose.model('Cache', {
  ttl: { type: Date, default: timeToLive },
});

Cache.pre('save', (next) => {
  this.ttl = timeToLive();
  next();
});

module.exports = Cache;
