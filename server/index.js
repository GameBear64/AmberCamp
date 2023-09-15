/* eslint-disable no-console */
const express = require('express');
const app = express();

require('dotenv').config({ path: '../.env' });

//============= Logger ==============
if (process.env.NODE_ENV == 'dev') app.use(require('morgan')('dev'));

//=============== DB ================
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose
  .connect(`mongodb://127.0.0.1:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`)
  .then(() => console.log(`Connected to ${process.env.MONGO_DB_NAME} in MongoDB`));

//============= Setup ==============
const { router } = require('express-file-routing');
require('express-async-errors');

const cors = require('cors');
const { checkAuth } = require('./middleware/auth');
const { trimBodyFields } = require('./middleware/global');

app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(trimBodyFields);
app.use(checkAuth);

app.use('/', router());

app.use((_req, res) => res.status(404).send({ message: 'Not found' }));
app.use((error, _req, res, _next) => {
  console.log('[SERVER ERROR]', error.message);
  res.status(error.status || 500);
  res.send({ message: error.message });
});

//=============== Docs ===============
const { swagger } = require('./docs/swagger.js');
swagger(app);

//===== Listen on port #### =====
app.listen(process.env.VITE_SERVER_PORT, () => {
  console.log(`Listening on http://localhost:${process.env.VITE_SERVER_PORT}/`);
});
