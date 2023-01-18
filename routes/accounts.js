const Router = require("express").Router();
const User = require("../models/User");
const router = Router;

//update account
router.put("/:id", async (req, res) => {
  try {
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
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.json({ status: "bad", msg: "cuenta no encontrada" });
    }
    res.json({ status: "ok", account: user });
  } catch (error) {
    console.log(error.message);
  }
});

//delete
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({ status: "ok", msg: "cuenta eliminada" });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
