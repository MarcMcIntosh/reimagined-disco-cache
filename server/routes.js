const { Router, json, urlencoded } = require('express');
const {
  deleteAll,
  deleteById,
  getCacheItem,
  setCacheID,
  createItem,
  updateItem,
} = require('./middleware');

// other features
// max number of items allowed in the cache, delete accroingly,
// every item has a ttl,
// if the ttl has expired it must not be used, instead an new item should be made
// ttl should be updated on every hit

const router = Router();
router.all('/', (req, res) => {
  res.json({
    message: 'Welcome',
    endpoints: [
      { method: 'GET', url: 'cache/:id', description: 'get cache item by id, create if not exists, returns the id of the new item' },
      { method: 'POST', url: 'create', description: 'create item with data provided in the json body of the request and will return the id of the new item' },
      { method: 'PUT', url: 'update', description: 'updates an item returns the updated item' },
      { method: 'DELETE', url: 'remove:/id', description: 'delete the cache item nby id' },
      { method: 'DELETE', url: 'remove-all', description: 'delete all items' },
    ],
  });
});
// create item
router.post('create', json, createItem, (req, res, next) => {
  console.log(req.route);
  console.log(req.body);
  next();
  // create a new item
}, (req, res) => res.json(req.cacheID));

// update item
router.put('update', json, (req, res, next) => {
  // get the item with the provided id,
  // updated it with provided data or create.
  console.log(req.route);
  next();
}, setCacheID, getCacheItem, updateItem, (req, res) => res.json(req.cache));


// delete-all
router.delete('remove-all', (req, res, next) => {
  console.log(req.route);
  next();
}, deleteAll, (req, res) => res.status(204));


// read item
router.get('cache/:id', urlencoded, setCacheID, getCacheItem, (req, res, next) => {
  // search the data base for item witd the id

  // if found log out put CACHE HIT and return all the data for the item
  console.log(req.route);

  // if not found create a random string to use as the for the item id,
  // create the item and return the id
  next();
}, (req, res) => {
  res.send(req.cache);
});

// delete item
router.delete('remove/:id', urlencoded, setCacheID, deleteById, (req, res, next) => {
  // check the cache for the id and remove item
  console.log(req.route);
  next();
}, (req, res) => res.status(204));

module.exports = router;
