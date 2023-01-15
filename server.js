const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

//mongodb+srv://<username>:<password>@yendono-llegando.diplpux.mongodb.net/?retryWrites=true&w=majority
mongoose
  .connect(
    "mongodb+srv://otap:pato123@yendono-llegando.diplpux.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Hola Camus");
});

app.use("/auth", require("./routes/auth"));

app.listen(5000, () => {
  console.log("Server started");
});
