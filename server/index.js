/* eslint-disable no-console */
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

require('dotenv').config({ path: '../.env' });

//============= Logger ==============
if (process.env.NODE_ENV == 'development') app.use(require('morgan')('dev'));

//=============== DB ================
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose
  .connect(`mongodb://127.0.0.1:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`)
  .then(() => console.log(`Connected to ${process.env.MONGO_DB_NAME} in MongoDB`));

// ===== Auth =====
const { checkAuth, socketAuth } = require('./middleware/auth');

//============== Socket =============
const fileRegex = /events\/(?<cmd>.*?)\.js/g;
const { Glob } = require('glob');
const eventPaths = new Glob('./events/**/*.js', {});

io.use(socketAuth);

io.on('connection', (socket) => {
  for (const file of eventPaths) {
    let eventFile = file.replace(fileRegex, '$<cmd>');

    socket.on(eventFile, (...args) => {
      require(`./${file}`)({ io, socket }, ...args);
    });
  }
});

//============= API ==============
const { router } = require('express-file-routing');
require('express-async-errors');

const cors = require('cors');
const { trimBodyFields } = require('./middleware/global');

app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(trimBodyFields);
app.use(checkAuth);

app.use('/', router());

//=============== Docs ===============
const { swagger } = require('./docs/swagger.js');
swagger(app);

//========= Error Handlers ==========
app.use((_req, res) => res.status(404).json('Route not found, try another method?'));

app.use((error, _req, res, _next) => {
  console.log('[SERVER ERROR]', error);
  res.status(error.status || 500).json(error.message);
});

//===== Listen on port #### =====
server.listen(process.env.VITE_SERVER_PORT, () => {
  console.log(`Listening on http://localhost:${process.env.VITE_SERVER_PORT}/`);
});
