const Cache = require('./models/cache');


function setCacheID(req, res, next) {
  const PutOrPost = req.method === 'POST' || req.method === 'PUT';
  if (PutOrPost && req.body.id) {
    req.cacheID = req.body.id;
  } else if (PutOrPost) {
    res.status(404).send({ error: 'Missing form id value from data', message: 'id is required in body' });
  } else if (!req.params.id) {
    res.status(404).send({ error: 'Missing url parameter ', message: 'id is required in url' });
  } else {
    req.cacheID = req.params.id;
  }
  console.log('CACHE MISS');
  return next();
}

function createItem(req, res, next) {
  return Cache.create(req.body, (err, doc) => {
    if (err) { return res.status(500).send(err); }
    req.cache = doc;
    req.cacheID = doc._id; // eslint-disable-line
    return next();
  });
}

function updateItem(req, res, next) {
  const { id, ...rest } = req.body;
  Cache.findByIdAndUpdate(id, rest, { upsert: true }, (err, doc) => {
    if (err) { return res.status(500).send({ error: true, message: err.message }); }
    req.cache = doc;
    return next();
  });
}

// Get or create cache item
function getCacheItem(req, res, next) {
  if (!req.cacheID) { next(); }

  const cb = (err, doc) => {
    if (doc) { req.cache = doc; }
    return next(err);
  };

  return Cache.findById(req.cacheID, (err, doc) => {
    if (err) { return next(err); }
    return doc && doc.ttl < new Date().toJSON() ? doc.save(cb) : Cache.create({}, cb);
  });
}

function deleteById(req, res, next) {
  return Cache.findById(req.cacheID, (err, doc) => {
    if (err) { return next(err); }
    if (doc) { return doc.remove(erro => next(erro)); }
    return res.status(404).send({ status: 404, error: true, message: 'Not found' });
  });
}

function deleteAll(req, res, next) { return Cache.remove({}, next); }

module.exports = {
  setCacheID,
  getCacheItem,
  deleteById,
  deleteAll,
  createItem,
  updateItem,
};
