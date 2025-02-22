const config = require("../../../config");
const { User } = require("../../../db/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: { username },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (user) {
      return res.status(400).send("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword });
    const token = jwt.sign({ username }, config.jwtKey, {
      expiresIn: "1h",
    });
    res.send({ user: { id: newUser.id, username }, token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

module.exports = register;
