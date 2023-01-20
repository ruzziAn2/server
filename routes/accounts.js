const Router = require("express").Router();
const User = require("../models/User");
const { checkUser, checkAdmin } = require("../middlewares/checkToken");
const jwt = require("jsonwebtoken");
const { baseModelName } = require("../models/User");
const router = Router;

//update account
router.put("/:id", checkUser, async (req, res) => {
  try {
    const { username } = req.body.account;
    const token = req.headers.authorization?.split(" ")[1];
    const verifiedUser = jwt.verify(token, process.env.TOKEN_KEYWORD);
    const currentUser = await User.findById(req.params.id);

    if (
      currentUser._id.toString() !== verifiedUser.user._id &&
      verifiedUser.user.username !== process.env.ADMIN_LOGIN
    ) {
      return res.json({
        status: "bad",
        msg: "No tienes permiso para actualizar las cuentas de otras personas.",
      });
    }

    const existUserWithUsername = await User.findOne({ username });
    if (
      existUserWithUsername &&
      existUserWithUsername._id.toString() !== verifiedUser.user._id
    ) {
      return res.json({ status: "bad", msg: "Nombre de usuario existente" });
    }

    if (username === process.env.ADMIN_LOGIN) {
      return res.json({
        status: "bad",
        msg: "Nombre de usuario en uso",
      });
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body.account,
      },
      { new: true }
    );
    res.json({ status: "ok", msg: "Cuenta actualizada", account: updateUser });
  } catch (error) {
    console.log(error.message);
  }
});

//get account
router.get("/:id", checkUser, async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const verifiedUser = jwt.verify(token, process.env.TOKEN_KEYWORD);
    const currentUser = await User.findById(req.params.id);

    if (
      currentUser._id.toString() !== verifiedUser.user._id &&
      verifiedUser.user.username !== process.env.ADMIN_LOGIN
    ) {
      return res.json({
        status: "bad",
        msg: "No tienes permiso para ver las cuentas de otras personas.",
      });
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.json({ status: "bad", msg: "cuenta no encontrada" });
    }
    res.json({ status: "ok", account: user });
  } catch (error) {
    console.log(error.message);
  }
});

//get all
router.get("/get/all", checkAdmin, async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    console.log(error.message);
  }
});

//delete
router.delete("/:id", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const verifiedUser = jwt.verify(token, process.env.TOKEN_KEYWORD);
    const currentUser = await User.findById(req.params.id);

    if (
      currentUser._id.toString() !== verifiedUser.user._id &&
      verifiedUser.user.username !== process.env.ADMIN_LOGIN
    ) {
      return res.json({
        status: "bad",
        msg: "No tienes permiso para eliminar las cuentas de otras personas.",
      });
    }
    await User.findByIdAndDelete(req.params.id);

    res.json({ status: "ok", msg: "cuenta eliminada" });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
