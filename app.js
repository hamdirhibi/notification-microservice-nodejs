const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
dotenv.config();


//import routes
const notifcationRoute = require("./routes/notification");


// configuration of the rest API
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});



//Middlewares
// app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// route middlewares
app.use("/notification", notifcationRoute);

//Connect to DB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, () => {
  console.log("connected to db  ");
  
});
const server = require("http").createServer(app);
server.listen(port);
const io = require("socket.io").listen(server);

io.on("connection", (socket) => {
  console.log("new connection made ");

  socket.on("new-notif", (data) => {
    console.log("new---notif");
    io.emit("new-notif");
  });
});

