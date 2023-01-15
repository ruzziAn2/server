const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//ruta de registro
router.post("/register", async (req, res) => {
  //prueba
  try {
    const { username, email, password } = req.body;
    if (!username && !password && !email) {
      return res.json({
        status: "bad",
        msg: "Casi...",
      });
    }
    //error si el nombre de usuario es menor a 4 caracteres o mayor a 20
    const trimmedUsername = username.trim().toLowerCase();
    if (trimmedUsername.length < 4) {
      return res.json({
        status: "bad",
        msg: "Por lo menos 4 letras...",
      });
    }
    if (trimmedUsername.length > 20) {
      return res.json({
        status: "bad",
        msg: "20 caracteres tenes papá",
      });
    }
    //error contraseña muy corta
    if (password.trim().length < 5) {
      return res.json({
        status: "bad",
        msg: "La contraseña debe tener al menos 5 caracteres",
      });
    }
    //buscando si el usuario que se quiere crear existe
    const existUser = await User.findOne({ username });
    if (existUser) {
      return res.json({
        status: "bad",
        msg: "El nombre de usuario ya existe",
      });
    }
    //encriptando contraseña
    const hashedPass = await bcrypt.hash(password, 10);

    //creando usuario
    const newUser = await new User({
      username,
      password: hashedPass,
      email: email.trim().toLowerCase(),
    });
    //guardando usuario en la base de datos
    const savedUser = await newUser.save();

    const token = await jwt.sign({ user: existUser }, "tokensecret");
    //response/respuesta exitosa
    res.json({
      status: "OK",
      msg: "se creo el Usuario",
      user: savedUser,
      token,
    });
  } catch (error) {
    console.log(error.message);
  }
});
//ruta de login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.json({
        status: "bad",
        msg: "Casi...",
      });
    }
    //buscando si el usuario que se quiere loguear existe
    const existUser = await User.findOne({ username });
    //error SI NO existe el usuario
    if (!existUser) {
      return res.json({
        status: "bad",
        msg: "No se encuentra el nombre de usuario",
      });
    }

    // //comprobando si existe el email
    // const existEmail = await User.findOne({ email });

    //
    const comparedPass = await bcrypt.compare(password, existUser.password);

    if (!comparedPass) {
      return res.json({
        status: "bad",
        msg: "la contraseña no coincide",
      });
    }

    const token = await jwt.sign({ user: existUser }, "tokensecret");

    // const decodedToken = await jwt.decode()

    //response/respuesta exitosa
    res.json({
      status: "OK",
      msg: "se ingreso correctamente",
      user: existUser,
      token,
    });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;