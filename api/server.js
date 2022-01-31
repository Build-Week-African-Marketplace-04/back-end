const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const usersRouter = require('./users/usersRouter')
const itemsRouter = require('./items/itemsRouter')

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.use("/api/auth", itemsRouter);
server.use("/api/users", usersRouter);

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server
