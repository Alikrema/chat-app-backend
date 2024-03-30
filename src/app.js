const express = require("express");
const app = express();
const config = require("../config/index");
const cors = require("cors");

const port = config.port;
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
