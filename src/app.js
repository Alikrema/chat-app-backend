const express = require("express");
const app = express();
const config = require("../config");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// parse application/json
app.use(bodyParser.json({ limit: "50mb" }));

app.use("/auth", require("./routes/auth"));

const port = config.port;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
