const jwt = require("jsonwebtoken");
const { off } = require("../models/User");

const checkUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.json({ status: "bad", msg: "Token not found" });
    }

    const verifiedToken = await jwt.verify(token, "tokensecret", (err) => {
      if (err) {
        return res.json({
          status: "bad",
          msg: "Unauthorized or invalid token",
        });
      }
    });

    if (!verifiedToken) {
      return res.json({ status: "bad", msg: "Unauthorized" });
    }

    next();
  } catch (error) {
    console.log(error.message);
  }
};

checkAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.json({ status: "bad", msg: "Token not found" });
    }

    const verifiedToken = await jwt.verify(token, "tokensecret", (err) => {
      if (err) {
        return res.json({
          status: "bad",
          msg: "Unauthorized or invalid token",
        });
      }
    });

    if (!verifiedToken) {
      return res.json({ status: "bad", msg: "Unauthorized" });
    }

    if (verifiedToken.user.username !== "adminotap") {
      return res.json({
        status: "bad",
        msg: "Usuario de administrador invalido",
      });
    }

    next();
  } catch (error) {
    console.log(error.msg);
  }
};

module.exports = { checkUser, checkAdmin };
