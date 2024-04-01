const config = require("../../../config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../../db/models");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: { username },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).send("Invalid password");
    }
    const token = jwt.sign({ id: user.id }, config.jwtKey, {
      expiresIn: "1h",
    });
    const { password: _, ...userWithoutPassword } = user.dataValues;
    res.send({ user: userWithoutPassword, token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

module.exports = login;
