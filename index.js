const express = require('express');
require('dotenv').config();
const routes = require('./server/routes');

const PORT_DEV = process.env.PORT_DEV || 8080;
const PORT = process.env.NODE_ENV === 'production' && process.env.PORT_PROD ? process.env.PORT_PROD : PORT_DEV;

const app = express();

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
