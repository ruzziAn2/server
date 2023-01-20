const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
      default: "",
    },
    city: {
      type: String,
      required: true,
      default: "",
    },
    createdAt: "",
    updatedAt: "",
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
