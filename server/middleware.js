const Cache = require('./models/cache');


function setCacheID(req, res, next) {
  if (req.method === 'POST' && req.body.id) {
    req.cacheID = req.body.id;
  } else if (req.method === 'POST') {
    res.status(404).send({ error: 'Missing form id value from data', message: 'id is required in body' });
  } else if (!req.params.id) {
    res.status(404).send({ error: 'Missing url parameter ', message: 'id is required in url' });
  } else {
    req.cacheID = req.params.id;
  }
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
  Object.assign(req.cache, rest);
  return req.cache.save((err, doc) => {
    if (err) { return res.status(500).send({ error: true, message: err.message }); }
    req.cache = doc;
    return next();
  });
}

// Get or create cache item
function getCacheItem(req, res, next) {
  if (!req.cacheID) { next(); }
  return Cache.findById(req.cacheID, (err, doc) => {
    if (err) {
      return next(err);
    }
    req.cache = doc && doc.ttl < Date.now() ? doc : Cache.create();
    return req.cache.save((erro, cacheDoc) => {
      if (err) { return next(erro); }
      req.cache = cacheDoc;
      return next();
    });
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
