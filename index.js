const express = require('express');
require('dotenv').config();

const routes = require('./server/routes');

const PORT_DEV = process.env.PORT_DEV || 8080;
const PORT_PROD = process.env.PORT_PROD || 8080;
const IS_PROD =  process.env.NODE_ENV === 'production';
const PORT = IS_PROD ? PORT_PROD : PORT_DEV;

const app = express();

app.use(routes);

app.listen(PORT, () => {
  console.log('Running ', IS_PROD ? 'production ': 'development ', 'server');
  console.log(`listening on http://localhost:${PORT}`);
});
