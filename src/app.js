const express = require("express");
const app = express();
const config = require("../config");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");

app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// parse application/json
app.use(bodyParser.json({ limit: "50mb" }));

app.use("/auth", require("./routes/auth"));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

const port = config.port;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
