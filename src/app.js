const express = require("express");
const app = express();
const config = require("../config");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const setupSocketIo = require("./sockets");

app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// parse application/json
app.use(bodyParser.json({ limit: "50mb" }));

app.use("/auth", require("./routes/auth"));
app.use("/chat-room", require("./routes/chatRoom"));

const server = http.createServer(app);

setupSocketIo(server);

const port = config.port;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
