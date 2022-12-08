const http = require('http')
const express = require('express');
const logger = require('logger')
const cors = require('cors')
const { Server } = require("socket.io");

// socket configuration
const WebSockets = require('../utils/WebSockets')

const socket = new WebSockets()
// mongo connection
require("../config/mongo");

// routes
const indexRouter = require("../routes/index.js"); 
const userRouter = require("../routes/user.js");
const chatRoomRouter = require("../routes/chatRoom.js");
const deleteRouter = require("../routes/delete.js");
// middlewares
const { decode } = require('../middlewares/jwt.js');

const app = express();

/** Get port from environment and store in Express. */
const port = process.env.PORT || "3000";
app.set("port", port);

// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/room", decode, chatRoomRouter);
app.use("/delete", deleteRouter);


/** catch 404 and forward to error handler */
app.use('*', (req, res) => {
    return res.status(404).json({
      success: false,
      message: 'API endpoint doesnt exist'
    })
  });

/** catch 404 and forward to error handler */
app.use('*', (req, res) => {
    return res.status(404).json({
      success: false,
      message: 'API endpoint doesnt exist'
    })
  });

  /** Create HTTP server. */
const server = http.createServer(app);
/** Listen on provided port, on all network interfaces. */
/** Create socket connection */
global.io = new Server(server);
global.io.on('connection', socket.connection);

server.listen(port, ()=> {
  console.log(`Listening on port:: http://localhost:${port}/`)
});

/** Event listener for HTTP server "listening" event. */
// server.on("listening", () => {
//   console.log(`Listening on port:: http://localhost:${port}/`)
// });
